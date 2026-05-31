// astro.config.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Main Astro configuration for REPRESENTATION LEARNING LAB (RLL) website.
// Optimized for output on Cloudflare Pages.
// ─────────────────────────────────────────────────────────────────────────────

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare'; // 1. Added the Cloudflare import

// Remark/Rehype plugins for math rendering
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(), // 2. Added the Cloudflare adapter
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [[rehypeKatex, { output: 'html' }]],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
      langs: ['python', 'c', 'rust', 'bash', 'typescript', 'javascript', 'json'],
      wrap: true,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    optimizeDeps: {
      include: ['katex'],
    },
  },
});