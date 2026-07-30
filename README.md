# MamaAfya Chatbot

a conversational front-end for **MamaAfya**, a unified maternal health platform
bridging expectant mothers, Community Health Workers (CHWs) & healthcare
facilities in Kenya.

## why Botpress Community

## Overview

## what this chatbot does

mirrors the **Mother's Journey** from the system concept doc:

CHW Triage Dashboard---Done by Abdinasir Jibril.
Mama Afya Dashboard ---Done--by Maryaane.
MamaBot Chat & System Reporting--planned.
Pregnancy Nutration--- Done.
Mama Afya Home Dashboard----planned

all logic is channel-agnostic: the same risk rules and alert pipeline also
power the USSD gateway (`*384#`) stub included here, so a mother on a basic
phone and a mother on the PWA get identical outcomes.

## project structure

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
