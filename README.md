# Otaku Vibe

**Otaku Vibe** is a modern anime and manga discovery platform, rebuilt from the ground up with a focus on performance, scalability, and developer experience. This Version 2.0 release showcases my expertise in React, TypeScript, state management, and UI/UX best practices.

---

## 🚀 Tech Stack

- **React** (Vite-powered)
- **TypeScript** (strictly typed)
- **Redux Toolkit** (RTK Query & Redux Persist)
- **React Router**
- **SCSS** (modular, themeable)
- **motion** (Animation framework)

---

## ✨ Features

- **Landing Page and curated widgets** for quick discovery of anime, manga, manhwa, manhua.
- **Detail Page** for in depth information on the content
- **Smooth Animations** (page transitions, micro-interactions)
- **Advanced Data Layer**
  - RTK Query for efficient API data fetching/caching
  - Redux Persist for seamless session continuity
- **Custom UI Components**
  - Atomic design: Atoms, Molecules, Organisms
  - Reusable components (Label, Box, Image, etc.)
- **Design System**
  - Light/Dark theme toggle (SCSS variables & tokens)
  - Responsive layouts, semantic HTML
- **Localization** (vernac-powered, multi-language ready)
- **Robust Error Handling** (error boundaries, loading states)
- **Modern Tooling**
  - ESLint & Stylelint for code quality
  - Vite for blazing-fast builds

---

## 🛠️ Implementation Highlights

- **Scalable Project Structure**
  - `atoms`, `molecules`, `organisms`: Atomic design for reusable UI
  - `pages`, `layouts`: Clear separation of concerns
  - `services`: API abstraction (Jikan API)
  - `shared`: Utilities, hooks, models
  - `store`: Centralized Redux state
  - `styles`: Modular SCSS, design tokens
- **Modern React Patterns**
  - Functional components, hooks, custom hooks (e.g., `useIntersectionObserver`)
  - Strict TypeScript for maintainability
- **UI/UX Excellence**
  - Smooth transitions, responsive design, accessibility
  - Theme toggle, localization, polished micro-animations

---

## 🏆 Milestones

### ✅ Milestone 1 (Completed)

- Core setup & project structure
- Jikan API integration
- Home, Anime, Manga landing pages
- Search & Detail pages
- Theme & localization support
- Loading states

### 🔜 Milestone 2 (Backlog)

- PWA support
- Infinite feed
- Custom Scroll restoration
- Optimization - lazy loading, SEO, etc
- Simple Analytics service
- Relative units for spacing, font

---

## 🚩 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173)

```bash
# Build for production
npm run build
```

Production files in the `dist` directory.

---
