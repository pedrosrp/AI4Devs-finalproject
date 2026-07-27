## Context

The current `SmtpEmailService` has hard-coded HTML in `SendMagicLinkAsync`, generating emails that are generic and lack Aura branding. Other transactional templates in `backend/workers/Aura.Workers.Email/templates/` use basic file-based structures but also lack design alignment. We need to unify the approach to use file-based templates exclusively through `EmailTemplateRenderer` and ensure that all emails reflect the Aura brand guidelines (colors, typography, logo placement).

## Goals / Non-Goals

**Goals:**
- Unify email rendering to solely use `EmailTemplateRenderer` for all emails.
- Standardize all templates (Magic Link, Invitation, RSVP Reminder, Accomplice Invite, Thank You Card, Payment Receipt) using Aura brand tokens (Playfair Display, Inter, #FDFBF7 background, #FFFFFF cards, #7C9A72 primary).
- Remove hard-coded inline HTML from C# services.

**Non-Goals:**
- Replace the SMTP service with a third-party transactional email API (e.g., SendGrid, Mailgun).
- Add new transactional email types beyond the existing set.

## Decisions

- **File-based Templates First**: We will eliminate hardcoded strings in `SmtpEmailService.cs`. The service will now resolve `magic-link.html` like it does for other templates, passing necessary variables to the renderer.
- **HTML Table Layouts**: Despite modern CSS capabilities, emails require HTML table-based structures with inline CSS for cross-client compatibility (Gmail, Outlook). We will implement a standard wrapper/header/footer in each template to avoid a complex layout engine for now, keeping it simple.
- **Brand Tokens**: We'll extract brand tokens defined in `conventions/style-guide.md` and inline them directly in the template CSS rules.
- **Web Safe Fallbacks**: While Playfair Display and Inter are primary, we will include standard fallbacks (Georgia, sans-serif) in font stacks.

## Risks / Trade-offs

- **Risk: Email Client Rendering Inconsistencies** → Mitigation: Stick to standard tables and inline styling rather than advanced CSS.
- **Risk: Placeholders breaking during refactor** → Mitigation: Expand unit tests for `EmailTemplateRenderer` to ensure all tokens (e.g. `{{magicLink}}`, `{{guestName}}`) are properly replaced before sending.
