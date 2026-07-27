## ADDED Requirements

### Requirement: Email Brand Alignment
All transactional emails SHALL conform to the Aura brand design system, which includes specific color tokens, typography (Playfair Display and Inter, or web-safe fallbacks), logo placement, and container styling.

#### Scenario: Rendering Magic Link Template
- **WHEN** the magic link template is rendered
- **THEN** it outputs an HTML structure with a #FDFBF7 background, a #FFFFFF card, the Aura logo, the Playfair Display heading, Inter body text, and a primary CTA button styled with the #7C9A72 background color.

#### Scenario: Safe Fallback Fonts
- **WHEN** an email client does not support web fonts (Playfair Display or Inter)
- **THEN** the text falls back to standard fonts like Georgia and sans-serif.

### Requirement: Unified Template Rendering
The system SHALL use file-based templates for all transactional emails, rather than hard-coded HTML strings within C# services.

#### Scenario: Dispatching Magic Link Email
- **WHEN** the system dispatches a magic link email
- **THEN** the `SmtpEmailService` delegates the HTML generation to `EmailTemplateRenderer` using the `magic-link.html` file instead of inline strings.
