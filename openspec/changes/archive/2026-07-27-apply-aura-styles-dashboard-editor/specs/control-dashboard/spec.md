## MODIFIED Requirements

### Requirement: Host Dashboard View
The system SHALL provide a dashboard for event hosts to view high-level statistics and a list of their events. The dashboard SHALL apply the Aura design system, featuring a `bg-cream` background, a "Your Events" title in `Playfair Display` font, and a responsive grid of event cards (1 column mobile, 2 tablet, 3 desktop).

#### Scenario: Dashboard loads
- **WHEN** the host navigates to the event dashboard
- **THEN** they see the dashboard styled according to the Aura design system.
- **THEN** they see the total number of invited guests, confirmed RSVPs, declined RSVPs, and pending RSVPs.

#### Scenario: Empty State
- **WHEN** the host has no events
- **THEN** the dashboard displays an empty state matching the Aura style guide (large icon in a circular `bg-surface`, Playfair title, secondary text description).
