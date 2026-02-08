# Project Rules

## Development Guidelines

1.  **Single Responsibility Principle**:
    *   Always make sure one component does one work.
    *   Break down large components into smaller, focused sub-components.

2.  **Image Optimization**:
    *   Always use optimized `Image` tags (Next.js `<Image />` component) instead of standard `<img>` tags unless there's a specific reason not to.
    *   Ensure proper `alt` text and sizing props.

3.  **Icons**:
    *   Always use `lucide-react` icons.
    *   If a custom icon is needed, create an `icons.tsx` (or similar) file where SVGs are defined and exported as components. Do not inline SVGs directly in business logic components.

## Design & UI

*   **Look and Feel**:
    *   Aim for the aesthetic of [https://ui.elevenlabs.io/](https://ui.elevenlabs.io/).
    *   Use dark mode, sleek gradients, and high-quality interactions.
*   **External Libraries**:
    *   We can leverage components from [https://magicui.design/](https://magicui.design/).
    *   Primary UI library: `shadcn/ui`.

## General

*   Keep code clean and formatted.
*   Use TypeScript for type safety.
