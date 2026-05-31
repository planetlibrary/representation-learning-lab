# REPRESENTATION LEARNING LAB (RLL) Website

A modern, high-performance static website for an academic machine learning research lab. Built with **Astro**, styled with **Tailwind CSS**, and deployable for free on **Cloudflare Pages**.

---

## ⚡ Quick Start

### Prerequisites
- Node.js ≥ 18 (Node 20 LTS recommended)
- npm ≥ 9

### Step 1 — Clone or initialise

If starting from scratch in an empty directory:

```bash
# Option A: Use this scaffold directly (files already created)
cd representation-leaning-lab
npm install

# Option B: Create a fresh Astro project and copy files over
npm create astro@latest representation-leaning-lab -- --template minimal --no-install
cd representation-leaning-lab
```

### Step 2 — Install all dependencies

```bash
# Core framework + integrations
npm install astro @astrojs/mdx @astrojs/tailwind

# Styling
npm install tailwindcss @tailwindcss/typography

# Math rendering
npm install remark-math rehype-katex katex

# Schema validation (bundled with Astro, but pinned here)
npm install zod

# Dev tools (optional but recommended)
npm install -D prettier prettier-plugin-astro
```

**One-liner to install everything from package.json:**

```bash
npm install
```

### Step 3 — Run the dev server

```bash
npm run dev
# → http://localhost:4321
```

### Step 4 — Build for production

```bash
npm run build
# → output in ./dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🏗️ Architecture

```
representation-leaning-lab/
├── src/
│   ├── content/                    # Content Collections (type-safe Markdown/MDX)
│   │   ├── config.ts               # Zod schemas for all collections
│   │   ├── members/                # One .md file per lab member
│   │   │   ├── dr-elena-vasquez.md
│   │   │   └── kai-okonkwo.md
│   │   ├── publications/           # .json files with paper metadata
│   │   │   └── papers.json
│   │   └── research/               # One .mdx file per research area
│   │       ├── causal-representation-learning.mdx
│   │       └── reinforcement-learning.mdx
│   │
│   ├── components/
│   │   ├── Navbar.astro            # Sticky responsive nav with mobile hamburger
│   │   ├── Footer.astro            # Minimal lab footer
│   │   ├── PublicationCard.astro   # Paper card: title, authors, links, badges
│   │   └── MemberCard.astro        # Member card: avatar, role, bio, socials
│   │
│   ├── layouts/
│   │   └── Layout.astro            # Root layout: <head>, fonts, KaTeX CSS, body
│   │
│   └── pages/
│       ├── index.astro             # Home: hero + research highlights + featured pubs
│       ├── team.astro              # Team: grouped by role
│       ├── publications.astro      # All papers grouped by year
│       └── research/
│           ├── index.astro         # Research area list
│           └── [slug].astro        # Dynamic: one page per research MDX file
│
├── public/
│   └── favicon.svg
│
├── astro.config.mjs                # Astro + MDX + Tailwind + KaTeX config
├── tailwind.config.mjs             # Palette, fonts, typography plugin
├── wrangler.toml                   # Cloudflare Pages build config
└── package.json
```

---

## ✏️ Adding Content

### Add a new lab member

Create `src/content/members/your-name.md`:

```markdown
---
name: "Dr. Jane Smith"
role: "Postdoctoral Researcher"
bio: "One-sentence summary for card preview."
email: "j.smith@example.edu"
joinYear: 2024
avatar: "https://your-avatar-url.com/photo.jpg"   # optional
github: "https://github.com/janesmith"            # optional
googleScholar: "https://scholar.google.com/..."    # optional
interests:
  - Bayesian Deep Learning
  - Uncertainty Quantification
order: 3        # controls position on Team page (lower = higher)
isAlumni: false
---

Full biography in Markdown goes here. Supports **bold**, *italic*, lists, etc.
```

### Add a publication

Add an entry to `src/content/publications/papers.json` (or create a new `.json` file):

```json
{
  "title": "Your Paper Title",
  "authors": ["Jane Smith", "Elena Vasquez"],
  "year": 2025,
  "venue": "NeurIPS",
  "type": "conference",
  "url": "https://paper-link.com",
  "pdfUrl": "https://arxiv.org/pdf/...",
  "abstract": "Optional abstract shown on the publications page.",
  "tags": ["your", "tags"],
  "featured": false
}
```

### Add a research area

Create `src/content/research/your-topic.mdx`:

```markdown
---
title: "Your Research Topic"
description: "One paragraph description for cards and meta tags."
order: 3
tags:
  - your-tag
featured: false
---

## Overview

Write your content here. Full MDX support:

**Math** (KaTeX): $E = mc^2$ or display mode:

$$
\mathcal{L}(\theta) = \mathbb{E}_{x \sim p}[\log q_\theta(x)]
$$

**Code** (Shiki-highlighted):

\`\`\`python
import torch
x = torch.randn(10, 128)
\`\`\`
```

---

## 🚀 Deploying to Cloudflare Pages

### Option A: Git Integration (recommended)

1. Push your repo to GitHub or GitLab.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com) → **Create a project** → **Connect to Git**.
3. Select your repo.
4. Set build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION = 20`
5. Deploy. Cloudflare will rebuild on every push to `main`.

### Option B: Direct Upload (Wrangler CLI)

```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist --project-name representation-leaning-lab
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `navy-950` | `#080e25` | Page background |
| `navy-900` | `#0e1c44` | Card backgrounds |
| `navy-800` | `#162a62` | Borders, dividers |
| `amber-500` | `#f59e0b` | Primary accent, highlights |
| `slate-200` | `#e2e8f0` | Body text |
| `slate-400` | `#94a3b8` | Secondary text |
| `Syne` | Display font | Headings, wordmark |
| `DM Sans` | Body font | Prose, UI labels |
| `JetBrains Mono` | Mono font | Code blocks, math |

---

## 🔧 Maintenance Notes

- **Adding a new role:** Edit the `role` enum in `src/content/config.ts` and add a badge colour in `MemberCard.astro`.
- **Changing the accent colour:** Update `amber-*` references in `tailwind.config.mjs` and `Layout.astro`.
- **Dark/light toggle:** Add a `<script>` in `Layout.astro` that reads `localStorage.theme` and sets `document.documentElement.classList`.
- **Search:** Integrate [Pagefind](https://pagefind.app/) by adding `npx -y pagefind --site dist` as a post-build step.
- **KaTeX version:** Pinned to `0.16.x` in the CDN URL in `Layout.astro`. Update both the URL and the `integrity` hash together.

---

## 📄 License

MIT. Replace this with your institution's preferred licence.
