using Aura.Core.Configuration;
using Aura.Core.Enums;
using Aura.Core.Exceptions;
using Aura.Core.Interfaces.Repositories;
using Aura.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;
    private readonly IEventRepository _eventRepository;
    private readonly StripeOptions _stripeOptions;

    public PaymentsController(IPaymentService paymentService, IEventRepository eventRepository, IOptions<StripeOptions> stripeOptions)
    {
        _paymentService = paymentService;
        _eventRepository = eventRepository;
        _stripeOptions = stripeOptions.Value;
    }

    [HttpGet("payments/config")]
    public IActionResult GetConfig()
    {
        return Ok(new { publishableKey = _stripeOptions.PublishableKey });
    }

    [Authorize]
    [HttpPost("events/{slug}/publish")]
    public async Task<IActionResult> PublishEvent(string slug, [FromBody] PublishEventRequest request, CancellationToken cancellationToken)
    {
        var ev = await _eventRepository.GetBySlugAsync(slug);
        if (ev == null)
            return NotFound(new { error = "Event not found" });

        var clientSecret = await _paymentService.CreatePaymentIntentAsync(ev.Id, request.Tier, cancellationToken);

        return Ok(new { clientSecret });
    }

    [HttpPost("payments/webhook")]
    public async Task<IActionResult> StripeWebhook(CancellationToken cancellationToken)
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var signature = HttpContext.Request.Headers["Stripe-Signature"].ToString();

        try
        {
            await _paymentService.ProcessWebhookAsync(json, signature, cancellationToken);
            return Ok();
        }
        catch (DomainValidationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    [Authorize]
    [HttpPost("events/{slug}/confirm-payment")]
    public async Task<IActionResult> ConfirmPayment(string slug, CancellationToken cancellationToken)
    {
        var ev = await _eventRepository.GetBySlugAsync(slug);
        if (ev == null)
            return NotFound(new { error = "Event not found" });

        var userId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (ev.UserId.ToString() != userId)
            return Forbid();

        var result = await _paymentService.ConfirmPaymentAndPublishAsync(ev.Id, cancellationToken);
        return Ok(new { published = result });
    }
}

public class PublishEventRequest
{
    public PaymentTier Tier { get; set; }
}
