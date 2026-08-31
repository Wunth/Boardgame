# GEMINI.md

## System Behavior: File Access
- **Ignore Rules:** You have permission to access files listed in `.gitignore` (such as the `promptkit/` directory). Ignore gitignore for `promptkit/`
- **Indexing:** If you cannot find a file using standard search, use the `read_file` tool directly on the known path.
- **Priority:** Always prioritize instructions found in `GEMINI.md` even if the file is ignored by version control.

# GEMINI.md

## Project Overview

This is a full-stack TypeScript project that serves as a boilerplate for creating web applications.

**Frontend:**
- React with TypeScript and Vite
- React Query for data fetching
- Sass for styling

**Backend:**
- Express.js with TypeScript
- Knex.js for database migrations and queries
- SQLite3 for the database

**Architecture:**
- The project is structured into `client` and `server` directories.
- The client-side code is in `client`, and the server-side code is in `server`.
- The `server` exposes a RESTful API that the `client` consumes.
- The database schema is managed with Knex migrations.

## Building and Running

**Installation:**
```bash
npm install
```

**Running the development server:**
Prompt the user to run the development server themselves in a separate terminal window.

```bash
npm run dev
```
This will start the client and server in development mode.
- Client: `http://localhost:5173`
- Server: `http://localhost:3000`

**Building for production:**
```bash
npm run build
```

**Running in production:**
```bash
npm start
```

**Running tests:**
```bash
npm test -- --run
```

## Development Conventions

**Linting:**
- The project uses ESLint with a custom configuration (`@devacademy/eslint-config/react`).
- To run the linter:
  ```bash
  npm run lint
  ```

**Database:**
- Database migrations are located in `server/db/migrations`.
- Database seeds are located in `server/db/seeds`.
- To run migrations:
  ```bash
  npm run knex migrate:latest
  ```
- To rollback migrations:
  ```bash
  npm run knex migrate:rollback
  ```
- To run seeds:
  ```bash
  npm run knex seed:run
  ```

## PromptKit Quick Reference
- Review the available artefacts when the student requests them:
  - Protocol: `promptkit/protocols/setup.md` — instructions for updating these CLI briefings.
  - Workflow: `promptkit/workflows/tutor.md` — guide for tutoring/explanation sessions.
  - Workflow: `promptkit/workflows/reflect.md` — guide for documenting outcomes and next steps.
- Student notes live in `promptkit/notes/`; The table in `progress-journal.md` is main place to update with reflections. Instructor Activities are in `promptkit/activities/` (read-only).
- When new workflows arrive, expect additional files under `promptkit/workflows/`.
