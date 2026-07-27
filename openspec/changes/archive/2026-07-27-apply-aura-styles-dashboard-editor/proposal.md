## Why

Aura's design system requires a warm palette, Playfair Display and Inter typography, generous rounded corners, and soft shadows to communicate a premium feel. Currently, the Dashboard and Event Editor screens don't fully apply these styles, leaving the user interface disconnected from the intended brand experience.

## What Changes

- Apply Aura styling to the main `dashboard` layout, including a `bg-cream` background and `Playfair Display` typography for the main title.
- Update the Event Card to use `app-card` with `rounded-lg`, correct padding, typography, and new status badges (`Published`, `Draft`).
- Add an editor top bar containing breadcrumbs, the title, and action buttons (`Preview`, `Save`, `Publish`).
- Enhance the event editor layout with `card-bg` containers, properly styled forms, native inputs styled consistently, and a centered live preview.
- Update shared components (`button`, `card`, `badge`, `input`) to strictly adhere to `styles.scss` design tokens, eliminating hardcoded colors.

## Capabilities

### New Capabilities

### Modified Capabilities
- `control-dashboard`: Update dashboard layout and event cards to conform to the Aura design system.
- `template-editor`: Update editor screen to include the new top bar and Aura-styled properties sidebar.
- `frontend-shell-components`: Update shared UI components (`button`, `card`, `badge`, `input`) to use Aura styles.

## Impact

- Frontend shared UI components (`app-button`, `app-card`, `app-badge`, `app-input`).
- Dashboard page template and styles.
- Event Editor page template, top bar, sidebar, and layout styles.
- Dependent views that use the modified shared components.
