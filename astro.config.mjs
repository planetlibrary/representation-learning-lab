// astro.config.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Main Astro configuration for REPRESENTATION LEARNING LAB (RLL) website.
// Optimized for static output on Cloudflare Pages.
// ─────────────────────────────────────────────────────────────────────────────

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// Remark/Rehype plugins for math rendering
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  // ── Output ──────────────────────────────────────────────────────────────────
  // 'static' generates a fully pre-rendered site — zero server costs on
  // Cloudflare Pages. All pages are HTML files at build time.
  output: 'static',

  // ── Integrations ────────────────────────────────────────────────────────────
  integrations: [
    // MDX: allows writing JSX/components inside Markdown research pages.
    // We thread our math plugins through MDX so .mdx files support equations.
    // mdx({
    //   remarkPlugins: [remarkMath],
    //     rehypePlugins: [[rehypeKatex, { output: 'html' }]],

    // }),
    mdx(),

    // Tailwind: utility-first CSS. applyBaseStyles: false lets our Layout.astro
    // own the base reset, preventing double-injection of Preflight.
    tailwind({ applyBaseStyles: false }),
  ],

  // ── Markdown (for .md files in content collections) ─────────────────────────
  // Apply the same math plugins to plain .md files (e.g., member bios that
  // might include inline equations in the future).
  markdown: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [[rehypeKatex, { output: 'html' }]],

    // Shiki provides zero-runtime syntax highlighting at build time.
    // Themes: 'github-dark', 'nord', 'one-dark-pro', 'dracula', etc.
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Dark theme for code blocks — matches the site's aesthetic.
      theme: 'one-dark-pro',
      // Languages to pre-load; Shiki will lazy-load others on demand.
      langs: ['python', 'c', 'rust', 'bash', 'typescript', 'javascript', 'json'],
      // Enable word wrapping so long lines don't break mobile layouts.
      wrap: true,
    },
  },

  // ── Build optimizations ──────────────────────────────────────────────────────
  build: {
    // Inline small stylesheets to cut round-trips on first paint.
    inlineStylesheets: 'auto',
  },

  // ── Vite (underlying bundler) ────────────────────────────────────────────────
  vite: {
    // Optimise KaTeX fonts — they're large; tell Vite to handle them properly.
    optimizeDeps: {
      include: ['katex'],
    },
  },
});
