using Aura.Core.DTOs.Accomplices;

namespace Aura.Core.Interfaces.Services;

public interface IAccompliceService
{
    Task<AccompliceResponse> GrantAccessAsync(string eventSlug, GrantAccessRequest request, string frontendBaseUrl, CancellationToken cancellationToken = default);
    Task RevokeAccessAsync(Guid accompliceId, CancellationToken cancellationToken = default);
    Task ResendMagicLinkAsync(Guid accompliceId, string frontendBaseUrl, CancellationToken cancellationToken = default);
    Task<IEnumerable<AccompliceResponse>> GetAccomplicesByEventAsync(string eventSlug, CancellationToken cancellationToken = default);
    Task<string> VerifyTokenAsync(string token, CancellationToken cancellationToken = default);
    Task<AccompliceMeResponse> GetMeAsync(Guid accompliceId, CancellationToken cancellationToken = default);
}
