# Gojo Content Studio

An AI-powered tool for generating platform-ready video titles and social captions. The project now ships with a Vite + React front end and an Express-based API server that connects to OpenAI for high quality copy suggestions.

## Prerequisites

- Node.js 18+
- An OpenAI API key with access to the specified model

## Project structure

```
Gojo-Caption-and-Title-Generator/
├── Gojo Studio/           # Front-end application (Vite + React)
└── server/                # Express API server powering AI generation
```

## Getting started

### 1. Install dependencies

```bash
cd "Gojo Studio"
npm install

cd ../server
npm install
```

### 2. Configure environment variables

1. Copy the example file and fill in your credentials:

   ```bash
   cd server
   cp .env.example .env
   ```

2. Edit `.env` and add your OpenAI API key. You can optionally set a different `OPENAI_MODEL` and configure `CLIENT_ORIGIN` with a comma separated list of allowed origins for CORS in production.

### 3. Start the development servers

In one terminal window run the API (from the `server` directory):

```bash
npm run dev
```

In another terminal window run the front-end (from the `Gojo Studio` directory):

```bash
npm run dev
```

The Vite dev server is configured to proxy `/api` requests to `http://localhost:5000`, so the React app will transparently talk to the Express backend during development.

## Environment variables (front end)

The front end expects the API to be reachable at `/api` by default. If you deploy the API to a separate domain, create a `.env` file inside `Gojo Studio` and set:

```
VITE_API_BASE_URL=https://your-server-domain.com
```

## Production build

1. Build the front end:

   ```bash
   cd "Gojo Studio"
   npm run build
   ```

2. Deploy the compiled assets under `Gojo Studio/dist` alongside the running API server.

## API

- `POST /api/generate`: Accepts a JSON payload with `platform`, `description`, and optional `referenceContent`. Returns a generated title and multiple caption variations.
- `GET /api/health`: Simple health-check endpoint.

Make sure to keep your API key safe and never expose it in the browser.
