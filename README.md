# Puzzle Paradise — A MERN Puzzle Shop & Community

Short description
-----------------
Puzzle Paradise is a MERN (MongoDB, Express, React, Node) application that combines an e‑commerce storefront for puzzles with a community/programs area (events, challenges, hangouts). It includes a client React app (product pages, cart, modals, animations) and a Node/Express API with MongoDB persistence and basic auth/support for cart operations.

This README documents project purpose, structure, setup, development workflows, environment variables, and useful notes.

Key features
------------
- Browse puzzles with details and image gallery
- Product detail modal with animations (framer-motion)
- Cart management (global CartContext + localStorage persistence)
- Programs/community section (slides/carousel for events)
- REST API for puzzles, users/auth, and cart operations
- Dev tooling: ESLint, Prettier, React/Node workflows

Tech stack
----------
- Frontend: React, React Router, Context API, Framer Motion, Tailwind/CSS (project-specific)
- Backend: Node.js, Express
- Database: MongoDB (Atlas or local)
- Dev tooling: ESLint (custom config), nodemon, concurrently (optional), npm

Repository layout
-----------------
Assumes three main folders in repository root:

- client/ — React SPA (src/components, src/context, hooks, styles, package.json)
- server/ — Express API (models, routes, controllers, package.json)
- scripts/ or tooling/ — optional build, seeding, helpers (or other top-level files)

Typical structure (example)
- /client
  - package.json
  - src/
    - components/ (ProductDetailModal.jsx, PuzzlePrograms.jsx, Cart UI, etc.)
    - context/ (CartContext.jsx, auth context)
    - pages/
    - App.jsx
- /server
  - package.json
  - src/
    - models/ (Puzzle.js, User.js)
    - routes/ (puzzles.js, auth.js, cart.js)
    - controllers/
    - index.js (app entry)
- README.md (this file)


Build & deploy
--------------
- Build client: cd client && npm run build
- Start production server: ensure server serves static files from client/build (if combined) and run node/dist server start (or use PM2).
- Deploy options: Heroku, Vercel (client), Render, DigitalOcean, or Dockerize stack.

API overview (typical endpoints)
-------------------------------
Note: adapt names/paths to actual server code.
- GET /api/puzzles — list puzzles
- GET /api/puzzles/:id — puzzle details
- POST /api/auth/register — create user
- POST /api/auth/login — authenticate
- GET /api/cart — (auth) get user cart / or cart persisted client-side
- POST /api/cart — add/update item
- DELETE /api/cart/:id — remove item

Database models (high level)
----------------------------
- Puzzle
  - _id, title, description, price, pieces, difficulty, image(s), stock, createdAt
- User
  - _id, name, email, passwordHash, role, createdAt
- Cart (optional server-side)
  - userId, items: [{ puzzleId, title, price, quantity }]

Frontend notes
--------------
- CartContext.jsx implements cart state via useReducer, persists to localStorage, and exports useCart hook.
- ProductDetailModal uses React hooks; ensure hooks are called unconditionally (useEffect should be declared at top-level then conditionally run inside).
- Framer Motion used for animated elements. If ESLint flags unused imports (e.g., `motion`), configure ESLint or use eslint-plugin-unused-imports to ignore framer-motion imports.

ESLint: ignoring unused imports from framer-motion
-------------------------------------------------
If you prefer granular control, install eslint-plugin-unused-imports and configure the rule to ignore framer-motion imports. Example (high level):
1. npm install --save-dev eslint-plugin-unused-imports
2. update ESLint config to enable `unused-imports/no-unused-imports` and `unused-imports/no-unused-vars`.
3. Use `varsIgnorePattern` or plugin settings to ignore `framer-motion` imports if needed.

Common gotchas & debugging
--------------------------
- React hooks rule: "Hooks must be called in the same order" — move useEffect/useState to top-level of component and run conditional logic inside callbacks.
- ESLint "Unexpected lexical declaration in case block" — wrap case code with braces `{ ... }`.
- Fast refresh warnings: prefer exporting only components from a file. Move hooks utilities (e.g., useCart) to their own file if needed.

Testing
-------
- Add tests under client/src/__tests__ or server tests with Jest/Supertest.
- Example scripts:
  - client: npm run test
  - server: npm run test

Contributing
------------
- Fork, create a feature branch (feature/xyz), make changes, add tests, open PR.
- Keep ESLint/Prettier rules consistent. Run linters before committing.


Contact / support
-----------------
For questions, add issues to the repo. Include OS, node/npm versions, and steps to reproduce.

Notes
-----
This README is a starting template. Update endpoint paths, env variable names, and scripts to exactly match implementation in your `server` and `client` package.json files and codebase.