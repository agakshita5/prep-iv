# PrepIV

Voice-based interview preparation & candidate screening platform (v2).

## Overview

PrepIV is a modern voice interview agent built with Next.js, React, and LiveKit. It enables real-time voice-based interview preparation and candidate screening with AI-powered interactions.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: prep-iv-ai (separate repo)
- **Real-time**: LiveKit for voice/video communication
- **Auth**: Clerk
- **Database**: Supabase

## Quick Start

```bash
npm install
npm run dev
npm build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` — Next.js app directory with routes
- `components/` — React components
- `lib/` — Utility functions and helpers
- `types/` — TypeScript type definitions
- `proxy.ts` — Backend proxy configuration

## Related Repositories

- **[prep-iv-ai](https://github.com/agakshita5/prep-iv-ai)** — Backend service
- **[ai-interview-agent](https://github.com/agakshita5/ai-interview-agent)** — v1 (original implementation)