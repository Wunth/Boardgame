@promptkit/

# AGENTS.md

## Project Overview

boilerplate-fullstack is a starter template for full-stack TypeScript web applications. It ships with a working end-to-end example (a `fruits` API and React frontend) that demonstrates the standard project patterns — students copy or adapt this boilerplate as the base for their own projects.

**Key Technologies:**
- **Frontend**: React, TypeScript, Vite, TanStack Query (React Query), Sass
- **Backend**: Node.js, Express.js, TypeScript, Knex.js, SQLite3
- **Testing**: Vitest, React Testing Library

**Architecture:**
- `client/`: React SPA — `client/apis/` for API client functions, `client/components/` for UI
- `server/`: Express backend — `server/routes/fruits.ts` is a working GET example; `server/db/` has Knex connection and migrations
- `models/`: Shared TypeScript interfaces
- API base path: `/api/v1`

## Building and Running

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run knex migrate:latest` | Run database migrations |
| `npm run knex seed:run` | Seed database with initial data |
| `npm run knex migrate:rollback` | Roll back the last migration |
| `npm run dev` | Start client (`http://localhost:5173`) and server (`http://localhost:3000`) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm test -- --run` | Run all tests once |
| `npm run lint` | Check code with ESLint (`@devacademy/eslint-config/react`) |

**Important:** Always use `npm run dev`. Opening `index.html` directly won't load TypeScript.

## Development Conventions

- **Code Style**: ESLint with `@devacademy/eslint-config/react`. Run `npm run lint` before committing.
- **Testing**: Vitest and React Testing Library. Test files live alongside the files they test.
- **Database**: Migrations in `server/db/migrations/`; seeds in `server/db/seeds/`. Use `npm run knex` for all Knex commands.

## Architecture Decisions

- **Working fruits example**: The template ships with a complete GET `/api/v1/fruits` route and a React component that fetches and displays the list. This is the pattern to follow when adding new routes and components.
- **Three-layer structure**: `server/db/<resource>.ts` (Knex queries) → `server/routes/<resource>.ts` (Express handlers) → `client/apis/<resource>.ts` (fetch functions) → React components with TanStack Query hooks.
- **Sass for styling**: `client/styles/` contains SCSS files. The `App.tsx` imports the main stylesheet.
- **TanStack Query for server state**: `QueryClientProvider` wraps the app in `client/index.tsx`. Use `useQuery` for reads and `useMutation` for writes.
- **Vite proxy**: In development, Vite proxies `/api` requests to the Express server at port 3000 — no CORS configuration needed.

## Key Conventions

- New routes go in `server/routes/<resource>.ts` and are mounted in `server/server.ts` with `server.use('/api/v1/<resource>', <resource>Routes)`.
- DB functions go in `server/db/<resource>.ts`; import the Knex connection from `server/db/connection.ts`.
- API client functions (using `superagent` or `fetch`) go in `client/apis/<resource>.ts`.
- TypeScript interfaces for shared types go in `models/`.
- **Note:** This template uses strict ESLint and Prettier rules. Follow them exactly when extending the boilerplate.

## Potential Pitfalls

- **Migrations must be run before seeding**: The fruits table won't exist until `migrate:latest` runs.
- **Route mounting order matters**: Mount API routes before the production static-file fallback in `server.ts`, or API calls will return the HTML page.
- **TanStack Query cache invalidation**: After mutations, call `queryClient.invalidateQueries({ queryKey: ['<resource>'] })` to refresh the list.
- **Sass imports**: If adding new `.scss` files, import them explicitly — they are not auto-loaded.

## Related Documentation

- [AGENTS.md](AGENTS.md): Shared AI context file — source of truth for all agent briefings.
- [CLAUDE.md](CLAUDE.md): Claude Code context (imports AGENTS.md; may include tutoring guidelines if used in educational settings).
- [GEMINI.md](GEMINI.md): Gemini AI context (self-contained copy of this file's content).

## PromptKit Quick Reference
- Review the available artefacts when the student requests them:
  - Protocol: `promptkit/protocols/setup.md` — instructions for updating these CLI briefings.
  - Workflow: `promptkit/workflows/tutor.md` — guide for tutoring/explanation sessions.
  - Workflow: `promptkit/workflows/reflect.md` — guide for documenting outcomes and next steps.
- Student notes live in `promptkit/notes/`; The table in `progress-journal.md` is main place to update with reflections. Instructor Activities are in `promptkit/activities/` (read-only).
- When new workflows arrive, expect additional files under `promptkit/workflows/`.
