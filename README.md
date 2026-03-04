# IEEEZC
---
## Docs
--- 
 - [Figma](https://www.figma.com/make/4H8oFEMxenCVvgg4RlvfHZ/University-Student-Organization-Website?p=f&t=doUdU0AnOhRRM0zl-0)
---
# Contributing to IEEE Zewail City Website

Thanks for wanting to contribute! This guide will get you up and running quickly.

## Tech Stack

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend:** Express.js + Mongoose
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js ≥ 20
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas) free tier)
- Git

### Setup

1. **Fork & clone the repo**

```bash
git clone https://github.com/<your-username>/IEEEZC.git
cd IEEEZC
```

2. **Install dependencies**

```bash

cd client && npm install

cd ../server && npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env.local

cp .env.example .env
```

Fill in the required values (MongoDB URI, OAuth keys, etc). Ask a board member if you're missing any.

4. **Run the dev servers**

```bash

cd client && npm run dev

cd server && npm run dev
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000`.

## Branch Naming

Always branch off `master`. Use this format:

```
<type>/<issue-number>-<short-description>
`

```


## Pull Request Workflow

1. **Create your branch**

```bash
git checkout main
git pull origin main
git checkout -b feat/4-events-page
```

2. **Make your changes** and commit them

3. **Push and open a PR**

```bash
git push origin feat/4-events-page
```

4. **In the PR description:**
   - Reference the issue: `Closes #4`
   - Briefly describe what you did and why
   - Add screenshots for any UI changes

5. **Wait for review** — at least 1 approval required before merging

6. **After merge** — delete your branch

```bash
git checkout main
git pull origin main
git branch -d feat/4-events-page
```

## Code Guidelines

### General

- No `console.log` left in production code (use a logger if needed)
- Write descriptive variable and function names
- Keep files under ~200 lines — split if they grow larger
- Remove unused imports and dead code

### Frontend (Next.js)

- Use the App Router (`app/` directory)
- Components go in `src/components/`, grouped by feature
- Use `next/image` for all images
- Tailwind only for styling — no inline styles or CSS modules
- Reusable UI primitives go in `src/components/ui/`

### Backend (Express)

- Follow the existing folder structure: `routes/`, `controllers/`, `models/`, `middleware/`
- Validate request bodies using a validation library (Joi or Zod)
- Never commit secrets or API keys
- Handle errors with the centralized error handler — don't `try/catch` and swallow silently

### Database

- Mongoose models go in `server/src/models/`
- Use descriptive schema field names
- Add indexes for fields used in queries

## Project Structure

```
IEEEZC/
├── client/                # Next.js frontend
│   ├── src/
│   │   ├── app/           # Pages (App Router)
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities, hooks, API client
│   │   └── public/        # Static assets
│   └── .env.example
├── server/                # Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── utils/
│   └── .env.example
└── CONTRIBUTING.md
```

