## Context

The Aura application currently functions, but the Dashboard and Template Editor do not align with the final Aura design system. We need to implement the design language (warm palette, Playfair Display/Inter, rounded shapes, soft shadows) to establish a premium feel. The changes are primarily cosmetic and structural (CSS/HTML updates) without affecting backend APIs or core business logic.

## Goals / Non-Goals

**Goals:**
- Apply the Aura design tokens accurately to the Dashboard page.
- Redesign the Event Card to include proper typography, layout, and new badge styles (`Published`, `Draft`).
- Add an editor top bar and redesign the Template Editor sidebar and preview container.
- Update shared shell components to strictly consume design tokens and remove any hardcoded hex values.

**Non-Goals:**
- Modifying backend APIs or models.
- Redesigning the global side navigation menu (to be handled separately).
- Implementing new features or business workflows.

## Decisions

- **CSS Variables & Tailwind:** We will use Tailwind utility classes mapped to CSS custom properties defined in `styles.scss` (e.g., `bg-primary`, `font-heading`, `text-text-secondary`, `rounded-lg`). No hardcoded colors like `#000` or `#e5e7eb` will be used in the templates.
- **Component Modifications:** The `app-card`, `app-button`, `app-badge`, and `app-input` components will be refined rather than completely rebuilt. We will add missing variants (like ghost buttons) and ensure they project content properly (e.g., icons in buttons).
- **Editor Layout Split:** We will introduce a new fixed editor top bar containing breadcrumbs, the title, and high-level actions (`Preview`, `Save`, `Publish`). The properties will remain in a redesigned card-based sidebar, and the preview will sit in a centered `card-bg` container.

## Risks / Trade-offs

- **[Risk]** Misaligned Tailwind config: Some utility classes might not map correctly to the CSS custom properties in `styles.scss`.
  - **Mitigation:** Manually verify and adjust the `tailwind.config.js` or `styles.scss` if required tokens are missing.
- **[Risk]** Broken responsiveness: Modifying structural layouts in the Dashboard and Editor might break smaller viewports.
  - **Mitigation:** Explicitly use responsive Tailwind grids (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) and test interactions on mobile sizes.
