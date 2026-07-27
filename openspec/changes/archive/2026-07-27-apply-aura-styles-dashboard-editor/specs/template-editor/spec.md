## MODIFIED Requirements

### Requirement: Template Editor UI
The system SHALL provide a Template Editor page where event hosts can customize their event invitation's template, colors, fonts, and hero image. The editor SHALL feature a fixed top bar (with breadcrumbs, title, and Preview/Save/Publish actions) and a sidebar for properties. The editor SHALL display a real-time preview of these changes inside a centered `card-bg` container.

#### Scenario: Real-time preview updates
- **WHEN** the user changes the primary color, font family, or template selection
- **THEN** the preview iframe/component reflects the changes immediately
