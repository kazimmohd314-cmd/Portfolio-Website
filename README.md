# Mohd Kazim — Portfolio

A reconstructed static portfolio website built with modern Astro, TypeScript, Tailwind CSS v4, Fontsource self-hosted typography, and an unsloppy editorial design system.

---

## 🛠 Tech Stack

- **Framework**: [Astro v5](https://astro.build/) (Static Site Generation / SSG)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Typography**: Self-hosted [Fontsource](https://fontsource.org/):
  - *Headings*: `Bricolage Grotesque`
  - *Body*: `Instrument Sans`
  - *Mono / Indices*: `JetBrains Mono`
- **Motion**:
  - Pure CSS `translateX` marquee loops (pause on hover)
  - [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/) for stacked project cards
  - [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling (disabled under `prefers-reduced-motion: reduce`)
- **Deployment**: [Netlify](https://www.netlify.com/) (configured in `netlify.toml`)

---

## 🚀 Quick Start

### 1. Development Server
```bash
npm run dev
```
Starts the local development server at `http://localhost:4321` with instant hot-reloading.

### 2. Type Check & Production Build
```bash
npm run build
```
Executes strict TypeScript/Astro diagnostics (`astro check`) and compiles static HTML into `dist/`.

### 3. Local Production Preview
```bash
npm run preview
```
Serves the compiled `dist/` directory at `http://localhost:4321`.

---

## 📂 Content Collections

Projects are configured using Astro 5 Content Collections in `src/content.config.ts`.

To add a new project, create a markdown file in `src/content/projects/your-project.md`:

```markdown
---
title: "Project Name"
year: 2026
tags: ["TypeScript", "Astro", "Tailwind CSS"]
summary: "Short description strictly under 20 words explaining the technical purpose."
live: "https://example.com"
code: "https://github.com/username/repo"
cover: "../../assets/images/project-cover.png"
order: 3
---

## Overview
Two short sentences describing the project. Zero buzzwords.

## Architecture
Modular details explaining tech stack and implementation.
```

---

## 🎨 Design Tokens

- `--paper`: `#F2EFE8` (Light) / `#121212` (Dark)
- `--ink`: `#121212` (Light) / `#F2EFE8` (Dark)
- `--accent`: `#FF4D1C` (Editorial vermilion punch)
- `--muted`: `#6B675F` (Light) / `#9E9A90` (Dark)

---

## 🌐 SEO & Netlify Deployment

- Canonical Domain: `https://mohdkazim.netlify.app`
- Auto-generated XML Sitemap: `https://mohdkazim.netlify.app/sitemap-index.xml`
- Robots file: `robots.txt`
- 301 Permanent Redirects: Configured in `public/_redirects` and `netlify.toml`
- Root Netlify configuration: `netlify.toml` at the workspace root automatically builds `base = "site"` and deploys `publish = "site/dist"`.

