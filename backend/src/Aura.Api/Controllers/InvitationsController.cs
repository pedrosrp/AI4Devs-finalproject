using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Aura.Core.Interfaces.Services;
using Aura.Core.DTOs.Invitations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/events/{slug}/invitations")]
[Authorize]
public class InvitationsController : ControllerBase
{
    private readonly IInvitationService _invitationService;

    public InvitationsController(IInvitationService invitationService)
    {
        _invitationService = invitationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetInvitations(string slug, CancellationToken cancellationToken)
    {
        var invitations = await _invitationService.GetInvitationsByEventAsync(slug, cancellationToken);
        return Ok(invitations);
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendInvitations(string slug, [FromBody] SendInvitationsRequest request, CancellationToken cancellationToken)
    {
        var scheme = Request.Headers["X-Forwarded-Proto"].FirstOrDefault() ?? Request.Scheme;
        var host = Request.Headers["X-Forwarded-Host"].FirstOrDefault() ?? Request.Host.Value;
        var frontendBaseUrl = $"{scheme}://{host}";

        await _invitationService.SendInvitationsAsync(slug, frontendBaseUrl, cancellationToken);
        return Ok(new { message = "Invitations successfully enqueued for sending." });
    }
}
