# QA Practice – Intelligent QA Documentation Generator

Generates **Test Plans, Test Strategies and Test Cases** from a Jira ticket and/or an uploaded `.docx` requirement, using the project templates (`Test_plan/`, `Test_Strategy/`, `Test_Cases/`; a bundled copy lives in `backend/templates/` for deployment).

**Live:** https://qa-practice-docgen.vercel.app

## Credentials
Nothing is hardcoded or stored on the server. Each user opens **Settings** and enters:
- Jira URL, email and API token
- LLM provider: **Groq** (API key) or **Ollama** (URL – must be publicly reachable when using the hosted app)

Values are saved in that user's browser and sent with each request.

## Run locally
```
cd implementation/source/frontend && npm install && npm run build
cd ../backend && npm install && npm start
```
Open http://localhost:4000 (hot-reload: also run `npm run dev` in `frontend` → http://localhost:5173).

## Deploy (Vercel)
From `implementation/source`: `npx vercel@48.6.0 deploy --prod`
`vercel.json` builds the React app and serves `backend/app.js` as the `/api` function.

## Workflow
1. Home → pick a document type.
2. Enter a Jira ID and/or attach a `.docx` → **Generate** (status: Draft).
3. `⚠️ MISSING` items are highlighted; fill them in the yellow box (AI updates only those sections) or **Edit** directly.
4. **Submit for review** → **Approve** (explicit user action only).
5. Download **DOCX** or **PDF** (print → Save as PDF).

Documents persist in the browser across navigation and reloads; **Clear** removes one.

## Structure
- `api/index.js` – Vercel entry → `backend/app.js`
- `backend/` – Express: `routes/`, `controllers/`, `services/` (jira, ai, docx), `utils/` (config, templates), `templates/`
- `frontend/` – React + Vite: `src/components/` (NavBar, Home, Generator, Settings)
