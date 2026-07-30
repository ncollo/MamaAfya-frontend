# MamaAfya — NurtureHome CHW Dashboard

> A Community Health Worker (CHW) triage dashboard for maternal health monitoring in Kenya.  
> Built with **React + Vite**,

---

## Overview

**MamaAfya** is a maternal health platform designed for Community Health Workers (CHWs) operating in Kenya. This repository contains the **CHW Triage Dashboard** — the professional-facing interface where health workers review and prioritize patient alerts sourced from AI Chatbot escalations, SMS survey responses, and automated system logs.

--- 
## Team assignment

CHW Triage Dashboard---Done by Abdinasir Jibril.
Mama Afya Dashboard ---Done--by Maryaane.
MamaBot Chat & System Reporting--planned.
Pregnancy Nutration--- Done.
Mama Afya Home Dashboard----planned


## Project Structure

```text
mamaafya/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx           # Left nav drawer
│   │   ├── Sidebar.module.css
│   │   ├── TopBar.jsx            # Sticky top app bar
│   │   ├── TopBar.module.css
│   │   ├── StatCards.jsx         # Summary stat cards
│   │   ├── StatCards.module.css
│   │   ├── PatientRow.jsx        # Single patient row
│   │   └── PatientRow.module.css
│   ├── data/
│   │   └── patients.js           # Mock patient records
│   ├── pages/
│   │   ├── TriageDashboard.jsx
│   │   └── TriageDashboard.module.css
│   ├── App.jsx
│   ├── App.module.css
│   ├── index.css                 # Global reset + CSS design tokens
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md