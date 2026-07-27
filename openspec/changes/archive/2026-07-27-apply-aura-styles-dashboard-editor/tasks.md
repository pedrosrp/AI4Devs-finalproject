## 1. Shared UI Components

- [x] 1.1 Update `BadgeComponent` to map `Published` (confirmed/green) and `Draft` (pending/amber) statuses, using `rounded-full` styling.
- [x] 1.2 Update `CardComponent` to use `rounded-lg`, `shadow-md`, `border-light`, and `bg-card-bg`.
- [x] 1.3 Update `ButtonComponent` to support `primary`, `secondary`, and `ghost` variants matching Aura design tokens, and verify icon support.
- [x] 1.4 Update `InputComponent` and `EmptyStateComponent` to consume design tokens and remove hardcoded hex colors.

## 2. Dashboard Layout & Cards

- [x] 2.1 Update Dashboard page template to use `bg-cream` background and `Playfair Display` for the main "Your Events" title.
- [x] 2.2 Update Dashboard responsive grid configuration (1 col mobile, 2 tablet, 3 desktop) with `gap-6`.
- [x] 2.3 Refactor the Event Card in the Dashboard to display the hero image with fallback, proper typography for titles, guest stats, and dynamic status badges.
- [x] 2.4 Update Dashboard empty state to match Aura design requirements.

## 3. Template Editor UI

- [x] 3.1 Implement a fixed top bar component for the Template Editor, containing breadcrumbs, "Edit Event" title, and action buttons (`Preview`, `Save`, `Publish`).
- [x] 3.2 Update Editor sidebar layout to group properties inside `card-bg` containers with `rounded-lg`, `shadow-md`, and proper padding.
- [x] 3.3 Style the Editor's live preview area to sit within a centered `card-bg` container.
- [x] 3.4 Ensure all native form inputs and labels in the Editor use proper typography and spacing per the design specs.
