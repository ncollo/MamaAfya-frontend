# MamaAfya Frontend

This repository contains the frontend for the MamaAfya maternal health platform. It is built with React and Vite and includes dashboard screens, patient workflows, nutrition resources, and chatbot-style interfaces for mothers and CHWs.

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js 18 or newer
- npm 9 or newer
- Git

## Clone the repository

```bash
git clone https://github.com/ncollo/MamaAfya-frontend.git
cd MamaAfya-frontend
```

## Install dependencies

```bash
npm install
```

## Environment variables

This project should never commit secrets or keys. Create a local `.env` file in the project root and add only the values you truly need for local development.

Use the example file as a template:

```bash
cp .env.example .env
```

Then update the values in `.env` with your local configuration. The repository ignores `.env` files so they will not be pushed to GitHub.

Example:

```env
PORT=3000
VITE_APP_NAME=MamaAfya
VITE_API_BASE_URL=http://localhost:3000
```

If a backend or external service is added later, store the API keys in `.env` instead of hardcoding them in the source code.

## Run the app

### Development mode

```bash
npm run dev
```

This starts the Vite development server. By default it will be available at:

```text
http://localhost:5173
```

### Production build

```bash
npm run build
```

To preview the built app locally:

```bash
npm run preview
```

## Project structure

```text
MamaAfya-frontend/
├── public/
├── src/
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── server.js
```

## Security notes

- Do not commit any real API keys, tokens, or secret values.
- Never store secrets in source files or in the repo history.
- Use `.env` for local-only configuration and keep `.env` out of Git.
- If you need to share configuration with teammates, share the `.env.example` template instead of the real values.

## Common troubleshooting

### Port already in use

If Vite reports that port 5173 is occupied, stop the process using it or run:

```bash
npm run dev -- --port 4173
```

### Dependency issues

If installation fails, delete the lockfile and node_modules, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## License

This project is provided as-is for local development and frontend prototyping unless a separate project license is added later.
