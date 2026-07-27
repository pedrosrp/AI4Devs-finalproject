## Why

The current sign-up / magic-link email looks unprofessional and is inconsistent with the Aura brand, providing a poor first impression for new hosts. Furthermore, other transactional emails do not match the Aura design system and some templates use hardcoded inline HTML rather than proper file-based templates. This change aligns all transactional emails with the Aura brand design and refactors the underlying code to use a consistent template rendering approach.

## What Changes

- **Design Alignment**: Update the HTML templates for all transactional emails to match the Aura brand design (Cream/white background, Aura logo, Playfair Display & Inter fonts, specific brand colors).
- **Refactoring**: Move `SmtpEmailService.SendMagicLinkAsync` away from inline HTML and use the existing `EmailTemplateRenderer` / file-based templates.
- **Template Updates**: Update `magic-link.html`, `invitation-email.html`, `rsvp-reminder.html`, `accomplice-invite.html`, `thank-you-card.html`, and `payment-receipt.html`.
- **Reliability**: Ensure email-client-safe HTML (tables, inline CSS) is used so templates render correctly in major clients (Gmail, Outlook, Apple Mail).
- **Testing**: Update and add unit/integration tests for `EmailTemplateRenderer` and the email service.

## Capabilities

### New Capabilities
- `transactional-email-templates`: Defines the design system and structural requirements for all Aura transactional emails.

### Modified Capabilities

## Impact

- **Affected Code**: `SmtpEmailService.cs`, `EmailTemplateRenderer.cs`
- **Affected Assets**: All HTML templates in `backend/workers/Aura.Workers.Email/templates/`
- **Dependencies**: No external dependency changes.
