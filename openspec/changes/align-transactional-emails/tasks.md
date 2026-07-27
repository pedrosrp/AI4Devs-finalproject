## 1. Refactor Email Service

- [x] 1.1 Modify `SmtpEmailService.SendMagicLinkAsync` to remove hardcoded inline HTML.
- [x] 1.2 Update `SmtpEmailService` to use `EmailTemplateRenderer` with the `magic-link.html` template.
- [x] 1.3 Ensure `SmtpEmailService` passes the correct variables (e.g. `{{magicLink}}`, `{{guestName}}`) to the renderer.
- [x] 1.4 Update unit and integration tests for `SmtpEmailService` and `EmailTemplateRenderer` to reflect the new template-based generation.

## 2. Update HTML Templates

- [x] 2.1 Update `magic-link.html` to align with Aura brand design (colors, typography, logo, layout).
- [x] 2.2 Update `invitation-email.html` to share the same Aura-branded wrapper.
- [x] 2.3 Update `rsvp-reminder.html` to share the same Aura-branded wrapper.
- [x] 2.4 Update `accomplice-invite.html` to share the same Aura-branded wrapper.
- [x] 2.5 Update `thank-you-card.html` to share the same Aura-branded wrapper.
- [x] 2.6 Update `payment-receipt.html` to share the same Aura-branded wrapper.
- [x] 2.7 Verify that all templates render correctly with safe fallback fonts and table-based layouts.
