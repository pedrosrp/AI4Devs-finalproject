using System.Net;
using System.Net.Mail;
using Aura.Core.Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Aura.Infrastructure.Services;

public class SmtpEmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<SmtpEmailService> _logger;

    public SmtpEmailService(IConfiguration configuration, ILogger<SmtpEmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendMagicLinkAsync(string email, string magicLinkUrl)
    {
        var smtpServer = _configuration["Smtp:Host"] ?? "smtp.gmail.com";
        var smtpPort = int.Parse(_configuration["Smtp:Port"] ?? "587");
        var smtpUsername = _configuration["Smtp:Username"];
        var smtpPassword = _configuration["Smtp:Password"];
        var fromEmail = _configuration["Smtp:FromEmail"] ?? "noreply@aura.com";

        using var client = new SmtpClient(smtpServer, smtpPort)
        {
            Credentials = new NetworkCredential(smtpUsername, smtpPassword),
            EnableSsl = true
        };

        var htmlBody = $@"
            <div style=""background-color: #f9f9f9; padding: 40px 20px; font-family: 'Inter', sans-serif; color: #2D2A26;"">
                <div style=""max-width: 500px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); text-align: center;"">
                    <div style=""margin-bottom: 24px;"">
                        <div style=""display: inline-block; width: 48px; height: 48px; background-color: #7E9E76; border-radius: 50%; vertical-align: middle; margin-right: 12px;""></div>
                        <span style=""font-size: 24px; font-weight: bold; vertical-align: middle; font-family: 'Playfair Display', serif;"">Aura</span>
                    </div>
                    <h1 style=""font-size: 32px; font-weight: 500; margin-bottom: 16px; font-family: 'Playfair Display', serif;"">Welcome to Aura</h1>
                    <p style=""font-size: 16px; color: #6B6560; margin-bottom: 32px; line-height: 1.5;"">
                        Click the button below to log in to your account. This magic link is secure and expires in 15 minutes.
                    </p>
                    <a href=""{magicLinkUrl}"" style=""display: inline-block; background-color: #7E9E76; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 16px;"">
                        &rarr; Log In to Aura
                    </a>
                    <div style=""margin-top: 32px;"">
                        <p style=""font-size: 12px; color: #9B9590; margin-bottom: 8px;"">If the button doesn't work, copy and paste this link into your browser:</p>
                        <a href=""{magicLinkUrl}"" style=""font-size: 12px; color: #C9A96E; word-break: break-all;"">{magicLinkUrl}</a>
                    </div>
                    <hr style=""border: none; border-top: 1px solid #F0EBE3; margin: 32px 0;"" />
                    <div style=""font-size: 11px; color: #9B9590;"">
                        <p style=""margin-bottom: 4px;"">If you didn't request this email, you can safely ignore it.</p>
                        <p>&copy; 2026 Aura Planning. All rights reserved.</p>
                    </div>
                </div>
            </div>"";

        var mailMessage = new MailMessage
        {
            From = new MailAddress(fromEmail),
            Subject = "Your Magic Link to log in to Aura",
            Body = htmlBody,
            IsBodyHtml = true,
        };
        mailMessage.To.Add(email);

        _logger.LogInformation("\n========================================\nMAGIC LINK FOR {Email}: {Url}\n========================================\n", email, magicLinkUrl);

        try
        {
            await client.SendMailAsync(mailMessage);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to send email to {Email}. If running locally without MailHog, copy the link above.", email);
        }
    }

    public async Task SendEmailAsync(string to, string subject, string htmlBody)
    {
        var smtpServer = _configuration["Smtp:Host"] ?? "smtp.gmail.com";
        var smtpPort = int.Parse(_configuration["Smtp:Port"] ?? "587");
        var smtpUsername = _configuration["Smtp:Username"];
        var smtpPassword = _configuration["Smtp:Password"];
        var fromEmail = _configuration["Smtp:FromEmail"] ?? "noreply@aura.com";

        using var client = new SmtpClient(smtpServer, smtpPort)
        {
            Credentials = new NetworkCredential(smtpUsername, smtpPassword),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(fromEmail),
            Subject = subject,
            Body = htmlBody,
            IsBodyHtml = true,
        };
        mailMessage.To.Add(to);

        await client.SendMailAsync(mailMessage);
    }
}
