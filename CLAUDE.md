# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Class Studio (MediConsol AI Education Studio) is an educational platform for AI literacy training in medical/healthcare settings. It features a 20-session curriculum with slides, AI interaction, and learning resources. All UI text is in Korean.

## Development Commands

```bash
npm run dev       # Start dev server on http://localhost:7900
npm run build     # Production build
npm run build:dev # Development build with source maps
npm run lint      # ESLint check
npm run preview   # Preview production build
```

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite (SWC transpiler)
- **UI**: shadcn/ui components (Radix UI primitives) + Tailwind CSS
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Data**: TanStack React Query (installed, not heavily used yet)

## Architecture

### Path Aliases
All imports use `@/` alias mapping to `./src/`:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### Component Structure
```
src/
├── components/
│   ├── ui/                 # shadcn/ui primitives (40+ components)
│   ├── LectureHeader.tsx   # Session header with navigation
│   ├── SessionSelector.tsx # Dropdown for session switching
│   ├── TabNavigation.tsx   # Slides/AI/Resources tab switcher
│   ├── SlideViewer.tsx     # Slide presentation (props: slides)
│   ├── AIPanel.tsx         # AI prompt/response (props: promptTemplates)
│   └── ResourcesPanel.tsx  # Resources list (props: resources)
├── pages/
│   ├── Index.tsx           # Home page with 20-session list
│   ├── Session.tsx         # Session page (/session/:id)
│   └── NotFound.tsx
├── data/
│   └── courseData.ts       # 20-session curriculum data
├── types/
│   └── session.ts          # TypeScript types for session data
├── hooks/
└── lib/utils.ts
```

### Routing
- `/` - Home page with all 20 sessions grouped by part
- `/session/:id` - Individual session page (1-20)

### Data Structure
Session data is defined in `src/data/courseData.ts`:
```typescript
interface Session {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  slides: Slide[];
  promptTemplates: PromptTemplate[];
  resources: Resource[];
}
```

### Curriculum Structure (20 Sessions)
- **Part 1 (1-4)**: AI 기초 - AI fundamentals, prompts
- **Part 2 (5-10)**: 간호 실무 AI - Nursing AI applications
- **Part 3 (11-15)**: 행정 실무 AI - Administrative AI applications
- **Part 4 (16-20)**: 과제 및 평가 - Projects and evaluation

### Styling
- CSS variables defined in `src/index.css` for theming
- Custom Tailwind classes: `.glass-panel`, `.tab-active`, `.slide-container`, `.ai-panel`, `.prompt-input`, `.result-display`
- Dark mode supported via class strategy
- Custom fonts: Noto Sans KR (body), Outfit (display)

## Adding Content

To add or modify session content, edit `src/data/courseData.ts`. Each session includes:
- `slides`: Array of slides with title, content, bulletPoints
- `promptTemplates`: AI prompt templates for the session
- `resources`: Learning resources (PDF, templates, links)

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Configuration is in `components.json`.

## Current State

- 20-session static curriculum with placeholder content
- Mock AI responses (1.5s simulated delay, no backend yet)
- Session navigation via URL routing and dropdown selector
- Ready for backend integration (OpenAI API)
