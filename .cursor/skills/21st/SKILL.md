---
name: 21st
description: Search, retrieve, and inspect production UI components, themes, templates, SVG logos, and inspiration from 21st.dev via 21st MCP.
---

# 21st.dev (Components, Themes & UI Design)

21st connects your assistant to 21st.dev's library of production-ready components, themes, templates, and UI inspiration.

## Primary Tools

### 1. `search`
Search across components, themes, and templates on 21st.dev.
- Parameters:
  - `query` (string, required): Keywords describing the component (e.g. `"pricing table"`, `"bento grid"`, `"hero header"`).
  - `type` (optional): Filter by type (`"component"`, `"theme"`, `"template"`).
  - `mine` (boolean, optional): Limit to user's published items.
  - `limit` (number, optional): Number of results to return.

### 2. `get_component`
Retrieve full source code and metadata for a specific component.
- Parameters:
  - `id` (number, optional) or `slug` (string, optional).

### 3. `get_inspiration`
Find project-aware UI inspirations tailored to your project's aesthetic and tech stack.

### 4. `get_theme`
Fetch tailored CSS variables and theme definitions for Tailwind or CSS modules.

### 5. `search_logo`
Search and retrieve SVG logos for popular brands and technologies.

## Workflow Guidelines
1. When designing or adding a new UI element:
   - Run `search` to discover existing high-quality implementations on 21st.dev.
   - Fetch the implementation code with `get_component`.
   - Adapt the component to match the local project's design system and styling standards.
