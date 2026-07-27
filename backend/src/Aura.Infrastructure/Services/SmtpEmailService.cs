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
            <div style=""font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;"">
                <div style=""text-align: center; margin-bottom: 20px;"">
                    <h1 style=""color: #2c3e50; margin: 0;"">Welcome to Aura</h1>
                </div>
                <div style=""background-color: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center;"">
                    <p style=""color: #333; font-size: 16px; margin-bottom: 20px;"">Click the button below to log in to your account.</p>
                    <a href=""{magicLinkUrl}"" style=""display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;"">Log In to Aura</a>
                    <p style=""color: #7f8c8d; font-size: 12px; margin-top: 20px;"">If the button doesn't work, copy and paste this link into your browser:<br/><a href=""{magicLinkUrl}"" style=""color: #3498db;"">{magicLinkUrl}</a></p>
                </div>
            </div>";

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
