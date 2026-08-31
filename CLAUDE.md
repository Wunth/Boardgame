# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

---

## Using This Boilerplate

This is a starter template, not an exercise with stubs. The `fruits` example is fully working end-to-end — use it as a pattern when building your own features.

**To add a new resource (e.g. `books`):**
1. Create `server/db/migrations/<timestamp>_create_books.ts` — define the table schema
2. Create `server/db/seeds/<timestamp>_books.ts` — add sample rows
3. Create `server/db/books.ts` — Knex query functions (`getAllBooks`, `addBook`, etc.)
4. Create `server/routes/books.ts` — Express router calling the DB functions
5. Mount in `server/server.ts`: `server.use('/api/v1/books', booksRouter)`
6. Create `client/apis/books.ts` — API client functions
7. Create React components and TanStack Query hooks in `client/components/`

The existing `fruits` implementation in each layer is the reference pattern to follow.

## Tutoring Guidelines

- Follow the `promptkit/workflows/tutor.md` workflow for explanation sessions.
- Ask questions that move students toward the answer rather than stating it.
- When a student is building a new resource, point them to the `fruits` example as a layer-by-layer pattern.
- Do not implement entire files on behalf of the student — ask them to describe each operation, then guide them.
