## MODIFIED Requirements

### Requirement: Shared UI Components
The system SHALL provide shared UI components (`ButtonComponent`, `InputComponent`, `CardComponent`, `BadgeComponent`, `EmptyStateComponent`, `NavbarComponent`) that adhere to the Aura style guide. These components SHALL rely strictly on design tokens (e.g., CSS variables or Tailwind classes like `bg-primary`, `rounded-lg`) and MUST NOT use hardcoded color values.

#### Scenario: Button variants rendering
- **WHEN** a ButtonComponent is rendered with different variants (primary, secondary, ghost, danger)
- **THEN** it displays the correct styling according to the CSS custom properties, and supports an optional left icon.

#### Scenario: Badge component styling
- **WHEN** a BadgeComponent is rendered for `Published` or `Draft` status
- **THEN** it displays the correct style (confirmed/verde for Published, pending/ámbar for Draft) with `rounded-full` corners.

#### Scenario: Card component styling
- **WHEN** a CardComponent is rendered
- **THEN** it applies `rounded-lg`, `shadow-md`, `border-light`, and `bg-card-bg` styles.
