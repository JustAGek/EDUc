# E-Learning / LMS Platform — Design Spec

**Date:** 2026-04-05
**Type:** Front-end only (mock data, no backend)
**Stack:** Next.js App Router, Tailwind CSS, Shadcn UI, Framer Motion, ReactPlayer, Lucide React
**Locale:** Bilingual English + Arabic with full RTL support

---

## 1. Project Structure

```
src/
├── app/
│   ├── [locale]/              # en | ar — drives LTR/RTL
│   │   ├── layout.tsx         # sets dir, lang, fonts, theme provider
│   │   ├── page.tsx           # landing page
│   │   ├── catalog/
│   │   │   └── page.tsx       # course catalog + pricing
│   │   └── course/
│   │       └── [slug]/
│   │           └── page.tsx   # video player + dashboard
│   └── layout.tsx             # root: metadata, global providers
├── components/
│   ├── ui/                    # shadcn components (button, card, tabs, etc.)
│   ├── landing/               # hero, features grid, course carousel, footer
│   ├── catalog/               # pricing cards, filter pills
│   ├── player/                # video player, control bar, sidebar, tabs
│   └── shared/                # navbar, theme toggle, locale switcher, logo
├── data/
│   └── mock/                  # courses, plans, modules — typed JSON
├── lib/
│   ├── i18n.ts                # locale config, translation helpers
│   └── utils.ts               # cn() helper, misc
├── hooks/
│   └── use-locale.ts          # locale/direction context hook
└── styles/
    └── globals.css            # tailwind directives, custom CSS vars for theme
```

### Key Decisions

- **`[locale]` dynamic segment** for URL-based locale routing (`/en/catalog`, `/ar/catalog`). Sets `dir="rtl"` and `lang="ar"` automatically on the `<html>` element.
- **Lightweight i18n:** Simple dictionary object per locale. No heavy library. Translation keys for UI strings only; mock course content stays in English with Arabic titles where relevant.
- **Theme:** CSS custom properties toggled via Tailwind's `dark` class strategy. Glassmorphism effects via `backdrop-blur` + semi-transparent backgrounds.
- **Fonts:** Inter for English, Cairo or IBM Plex Sans Arabic for Arabic.

---

## 2. Landing Page

### Hero Section
- Full-width with animated gradient background (deep indigo → blue → subtle purple, animated via CSS `background-size`).
- Bold centered headline, subtext, "Start Learning" CTA with glow/pulse hover.
- Framer Motion fade-up entrance animation.
- Arabic: text aligns right naturally via `dir="rtl"`.

### Value Proposition Grid
- 3-column grid (1-col on mobile).
- Glassmorphism cards: `bg-white/10 backdrop-blur-md border border-white/20` (dark), subtle shadow (light).
- Lucide icons: BookOpen, Award, Clock.

### Course Carousel
- CSS `overflow-x-auto` with `scroll-snap-type` — no heavy carousel library.
- Course cards: thumbnail, title, instructor, difficulty badge, duration.
- Hover: `scale(1.03)` via Framer Motion `whileHover`.
- Desktop: left/right arrow buttons. Mobile: native swipe.
- RTL: scroll direction flips automatically with `dir="rtl"`.

### Footer
- Minimalist 3-column: brand/logo, quick links, contact.
- Contact: instructor "Abdulrahman Mahmoud", support email "boodyaly18@gmail.com".
- Locale switcher duplicated here.

---

## 3. Course Catalog & Pricing Page

### Pricing Cards
- 3 tiers side-by-side: Free, Pro Monthly, Lifetime.
- Pro highlighted: larger scale, glowing border/accent ring, "Most Popular" badge.
- Feature checklist, price, CTA per card.
- Glassmorphism styling. Framer Motion staggered entrance.

### Course Filtering
- Pill-shaped toggle buttons for categories ("Web Dev", "Data Science", "Design") and difficulty ("Beginner", "Intermediate", "Advanced").
- Active pill: filled indigo. Inactive: outlined/ghost.
- Framer Motion `layoutId` for sliding highlight indicator.
- Filters combinable (one category + one difficulty).
- Grid updates with `AnimatePresence` for smooth transitions.

### Course Grid
- Responsive: 3-col desktop, 2-col tablet, 1-col mobile.
- Cards: thumbnail, title, category badge, difficulty badge, lesson count, duration.
- Hover: lift shadow + subtle scale.

---

## 4. Video Player & Dashboard

### Layout
- Theater mode: video ~70% width, collapsible sidebar ~30%.
- Sidebar collapse → video full width.
- Mobile: sidebar becomes slide-out drawer.
- Dark background behind player for immersion.

### Custom Video Player
- ReactPlayer engine wrapped in custom UI shell.
- Custom control bar overlay (bottom):
  - Play/pause, volume slider + mute, timeline scrubber + buffer indicator, time display, playback speed (0.5x–2x dropdown), fullscreen.
  - Auto-hide after 3s inactivity, reappear on mouse move.
- Semi-transparent dark bar, rounded corners, glassmorphism style.
- Lucide icons for all controls.

### Sidebar Navigation
- Course title at top.
- Overall progress bar (percentage).
- Accordion module list → expand to show lessons.
- Active lesson: indigo accent highlight.
- Completed lessons: checkmark icon.
- Click lesson → update player (switch mock video URL).
- Collapse/expand toggle (chevron icon).
- RTL: sidebar mirrors to left, icons/text flip.

### Tabbed Content Area (below video)
- Two tabs: Overview, Transcript.
- Animated underline indicator via Framer Motion `layoutId`.
- **Overview:** Course description, instructor info, "what you'll learn" list.
- **Transcript:** Scrollable text with timestamps (mock data), auto-scroll follows playback.
- Tab transitions: subtle fade via `AnimatePresence`.

---

## 5. Global UI/UX & Shared Components

### Navbar
- Sticky top, glassmorphism: `backdrop-blur-lg bg-white/70 dark:bg-slate-900/70`.
- Logo on leading side.
- Nav links: Home, Catalog.
- Trailing side: locale switcher (EN/AR toggle), dark/light toggle (Sun/Moon with rotation animation), "Log In" ghost button, "Subscribe" primary CTA.
- Mobile: hamburger → slide-out drawer.
- Hide-on-scroll-down, show-on-scroll-up behavior.

### Dark/Light Mode
- CSS class strategy (`dark` on `<html>`).
- Persisted to `localStorage`, respects `prefers-color-scheme` on first visit.
- Smooth transitions via `transition-colors duration-300`.

### Locale Switcher
- EN/AR toggle button in navbar.
- Switches route `/en/...` ↔ `/ar/...`.
- Updates `dir` and `lang` on `<html>`.
- UI strings swap; mock content shows localized titles.

### Page Transitions
- `AnimatePresence` wrapping page children in `[locale]/layout.tsx`.
- Subtle fade + slide transitions.

### Responsiveness
- Mobile-first Tailwind breakpoints.
- Grids → single column, sidebar → drawer, carousel → swipeable.

---

## 6. Color Palette

**Primary:** Deep blue/indigo
- Primary: `#4F46E5` (indigo-600)
- Primary hover: `#4338CA` (indigo-700)
- Primary light: `#818CF8` (indigo-400)

**Neutrals:**
- Light bg: `#F8FAFC` (slate-50)
- Dark bg: `#0F172A` (slate-900)
- Card light: `#FFFFFF`
- Card dark: `#1E293B` (slate-800)

**Accents:**
- Success: emerald-500
- Warning: amber-500
- Danger: rose-500

**Glassmorphism tokens:**
- Light: `bg-white/70 backdrop-blur-md border-white/20`
- Dark: `bg-slate-800/50 backdrop-blur-md border-slate-700/30`

---

## 7. Mock Data Shape

```typescript
interface Course {
  slug: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  thumbnail: string;        // placeholder image URL
  instructor: string;
  category: "web-dev" | "data-science" | "design";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;         // e.g. "4h 30m"
  lessonCount: number;
  modules: Module[];
}

interface Module {
  title: { en: string; ar: string };
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: { en: string; ar: string };
  videoUrl: string;         // sample video URL
  duration: string;
  completed: boolean;
  transcript: TranscriptEntry[];
}

interface TranscriptEntry {
  time: number;             // seconds
  text: { en: string; ar: string };
}

interface PricingPlan {
  name: { en: string; ar: string };
  price: string;
  period: { en: string; ar: string };
  features: { en: string; ar: string }[];
  highlighted: boolean;
  cta: { en: string; ar: string };
}
```

---

## 8. Dependencies

```json
{
  "next": "^15",
  "react": "^19",
  "tailwindcss": "^4",
  "framer-motion": "^12",
  "react-player": "^2",
  "lucide-react": "^0.400",
  "@radix-ui/react-*": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

Shadcn UI components installed via CLI as needed (button, card, tabs, accordion, dropdown-menu, sheet, badge, slider, progress, toggle).

---

## 9. Out of Scope

- Backend / API / database
- Authentication (Log In button is UI-only)
- Payment processing (Subscribe button is UI-only)
- User accounts, enrollment state persistence
- Search functionality
- Admin panel / CMS
- Deployment configuration
