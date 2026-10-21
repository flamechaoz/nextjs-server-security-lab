# Next Lab — Next.js Server, Security & Testing

A chapter-based, project-based learning application inspired by the navigation and progressive walkthrough style of the official [Next.js Learn course](https://nextjs.org/learn). This is an original curriculum and project, not a copy of the official course.

Learners move through 20 chapter pages. Every chapter has two modes:

- **Part A — Learn:** concepts, objectives, step-by-step instructions, source-file references, code samples, and a live endpoint where relevant.
- **Part B — Debug:** an intentionally broken local endpoint, a bug report, a list of investigation tasks, an optional hint, and expected behavior / verification steps.

The course progresses from server request handling through API design, security, testing, and a final secure task API capstone.

## Requirements

- Node.js 20.9 or later
- npm
- A code editor

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Start the curriculum

1. Open the home page and select **Start learning**.
2. Navigate between chapters using the left-side chapter list or previous/next controls.
3. Complete **Part A — Learn** before switching to **Part B — Debug**.
4. Open the linked debug endpoint, observe the incorrect behavior, then open the exact `route.ts` file shown on the page.
5. Fix the bug, refresh the endpoint, and check the expected behavior.
6. Use the hint if needed. Reference solution notes live in `solutions/lesson-XX/SOLUTION.md`.
7. Mark the lesson complete. Progress is stored in the browser's local storage; checklist state is stored in the session storage.

## Useful routes

- `/` — curriculum dashboard, search, module list, and local progress
- `/learn` — redirects to Chapter 01
- `/learn/server-request-lifecycle` — Chapter 01
- `/tasks` — working task management playground
- `/api/hello` — first working Route Handler
- `/api/tasks` — working task collection API
- `/api/tasks/1` — working dynamic task API
- `/api/debug/lesson-01` — intentionally broken Chapter 01 endpoint
- `/api/debug/tasks/2` — intentionally broken dynamic-params exercise for Chapter 05

## Project structure

```text
app/
  api/hello/route.ts                 # Working first endpoint
  api/tasks/route.ts                 # Working task collection API
  api/tasks/[id]/route.ts            # Working dynamic task API
  api/debug/lesson-XX/route.ts       # Intentionally broken debug handlers
  api/debug/tasks/[id]/route.ts      # Dynamic params debugging exercise
  learn/[slug]/page.tsx              # Chapter page route
  learn/page.tsx                     # Course entry redirect
  page.tsx                            # Curriculum dashboard
components/
  CurriculumDashboard.tsx            # Search, module list, progress UI
  LessonWorkspace.tsx                # Learn / Debug modes and navigation
lib/
  curriculum.ts                      # Chapter content and learning objectives
  services/task-service.ts           # In-memory task business logic
  validation/task-schema.ts          # Zod request schemas
lessons/                              # Markdown reference guides
solutions/lesson-XX/SOLUTION.md       # Reference solutions (check after trying)
debugging/lesson-XX/                  # Standalone exercise notes / broken snippets
```

## Debug endpoints are intentionally broken

The `/api/debug/*` routes are teaching fixtures. They deliberately demonstrate incorrect behavior and should only be run locally as part of the course. Do not deploy them. They use demo data and do not intentionally expose configured credentials. Learners should repair the route handler indicated by the chapter, then use the expected behavior on the page to verify the fix.

The normal `/api/tasks` implementation is a working teaching example. Its store is in memory and resets when the development server restarts; it is not production persistence. Authentication in the security chapters is taught through scenarios and testable boundaries rather than a production identity provider preconfigured in this starter.

## Quality checks

```bash
npm test
npm run test:coverage
npm run lint
npm run typecheck
npm run build
```

The exercises are designed to be edited locally. Some chapters are conceptual or testing-focused, so the corresponding debug endpoint is a simplified reproduction of the class of bug rather than a production-ready auth or infrastructure implementation.

## Official reference

The official Next.js Learn course uses a chapter-by-chapter path and asks learners to explore an existing project while implementing features. This project borrows that high-level learning approach, then adds an explicit debugging mode to every chapter.

- https://nextjs.org/learn
- https://nextjs.org/learn/dashboard-app/getting-started
