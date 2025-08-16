# Gojo-Caption-and-Title-Generator

## Backend Server

An Express server powers the `/generate` endpoint used to create platform specific titles and captions.

### Running the server

1. Provide an OpenAI API key in the environment:
   ```bash
   export OPENAI_API_KEY="sk-..."
   ```
2. Install dependencies and start the development server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The server listens on `http://localhost:3000` by default.

### Endpoint

`POST /generate`

Request body:
```json
{
  "platform": "youtube | tiktok | instagram | linkedin",
  "description": "string",
  "referenceContent": "string (optional)"
}
```

Successful responses match the `GeneratedContent` type:
```json
{
  "title": "...",
  "captions": [
    { "style": "...", "text": "...", "hashtags": "..." }
  ]
}
```
