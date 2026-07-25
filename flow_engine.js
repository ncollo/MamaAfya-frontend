/**
 * Minimal flow interpreter - FOR TESTING ONLY.
 *
 * Botpress itself is the real runtime that will execute flows/*.flow.json
 * natively once the bot is imported into Botpress Studio / Server. This
 * lightweight interpreter exists purely so we can verify, inside this
 * sandbox, that:
 *   (a) the flow JSON files are structurally valid and wire together
 *       correctly across files, and
 *   (b) the custom actions correctly call the integration server
 *       (risk engine, CHW alert dispatch, SMS, schedule lookup).
 *
 * It intentionally supports only the subset of the Botpress flow schema
 * used in this project (onEnter say/action steps, onReceive capture,
 * simple JS `next` conditions, and cross-file node references written as
 * "otherFlow.flow.json::nodeName").
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

class FlowEngine {
  constructor(flowsDir, actionsDir, bp) {
    this.flows = {};
    this.bp = bp;

    for (const file of fs.readdirSync(flowsDir)) {
      if (file.endsWith('.flow.json')) {
        const flow = JSON.parse(fs.readFileSync(path.join(flowsDir, file), 'utf8'));
        this.flows[file] = flow;
      }
    }

    this.actions = {};
    for (const file of fs.readdirSync(actionsDir)) {
      if (file.endsWith('.js')) {
        const name = path.basename(file, '.js');
        this.actions[name] = require(path.join(actionsDir, file));
      }
    }
  }

  resolveNode(currentFlowName, nodeRef) {
    if (nodeRef.includes('::')) {
      const [flowName, nodeName] = nodeRef.split('::');
      return { flowName, node: this.flows[flowName].nodes.find((n) => n.name === nodeName) };
    }
    return { flowName: currentFlowName, node: this.flows[currentFlowName].nodes.find((n) => n.name === nodeRef) };
  }

  interpolate(str, ctx) {
    return str.replace(/{{\s*([^}|]+?)\s*(?:\|\s*'([^']*)')?\s*}}/g, (_, expr, fallback) => {
      const val = this.evalExpr(expr.trim(), ctx);
      return (val === undefined || val === null || val === '') ? (fallback || '') : val;
    });
  }

  evalExpr(expr, ctx) {
    try {
      return vm.runInNewContext(expr, { ...ctx });
    } catch {
      return undefined;
    }
  }

  async runOnEnterSteps(steps, ctx, event, transcript) {
    for (const step of steps) {
      if (step.type === 'say') {
        const text = this.interpolate(step.text, ctx);
        transcript.push({ speaker: 'bot', text });
        if (step.quickReplies) {
          transcript.push({ speaker: 'bot', options: step.quickReplies.map((q) => q.label) });
        }
      } else if (step.type === 'action') {
        const action = this.actions[step.name];
        if (!action) throw new Error(`Unknown action: ${step.name}`);
        const args = {};
        for (const [k, v] of Object.entries(step.args || {})) {
          args[k] = typeof v === 'string' ? this.interpolate(v, ctx) : v;
        }
        const result = await action(this.bp, event, args);
        if (step.storeResultIn) {
          this.setPath(ctx, step.storeResultIn, result);
        }
      }
    }
  }

  setPath(ctx, dottedPath, value) {
    const parts = dottedPath.split('.');
    let obj = ctx;
    for (let i = 0; i < parts.length - 1; i++) {
      obj[parts[i]] = obj[parts[i]] || {};
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
  }

  /**
   * Runs a scripted conversation. `inputs` is an array of user replies to
   * feed in sequence whenever a node awaits input (onReceive present).
   */
  async run(startFlowName, startNodeName, event, inputs) {
    const ctx = { user: event.user || {}, temp: {} };
    const transcript = [];
    let flowName = startFlowName;
    let node = this.flows[flowName].nodes.find((n) => n.name === startNodeName);
    let inputIdx = 0;
    let steps = 0;

    while (node && steps < 50) {
      steps++;
      await this.runOnEnterSteps(node.onEnter || [], ctx, event, transcript);

      if (node.onReceive && node.onReceive.length > 0) {
        if (inputIdx >= inputs.length) break; // scripted conversation ended
        const userInput = inputs[inputIdx++];
        transcript.push({ speaker: 'user', text: userInput });
        for (const step of node.onReceive) {
          if (step.type === 'captureInput') {
            this.setPath(ctx, step.into, userInput);
          }
        }
      }

      const nextList = node.next || [];
      let matched = null;
      for (const candidate of nextList) {
        if (this.evalExpr(candidate.condition, ctx)) {
          matched = candidate;
          break;
        }
      }
      if (!matched) break;

      const resolved = this.resolveNode(flowName, matched.node);
      flowName = resolved.flowName;
      node = resolved.node;
    }

    return { transcript, ctx };
  }
}

module.exports = FlowEngine;
