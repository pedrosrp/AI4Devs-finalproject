using Aura.Core.DTOs.Events;
using Aura.Core.Enums;
using Aura.Core.Interfaces.Repositories;
using Aura.Core.Interfaces.Services;
using Aura.Core.Models;
using Aura.Core.Services;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using Xunit;

namespace Aura.Core.Tests.Services;

public class EventServiceTests
{
    private readonly IEventRepository _eventRepositoryMock;
    private readonly ISlugGenerator _slugGeneratorMock;
    private readonly IDataRetentionJobRepository _jobRepositoryMock;
    private readonly IMessageTemplateService _messageTemplateServiceMock;
    private readonly IQueueService _queueServiceMock;
    private readonly IConfiguration _configurationMock;
    private readonly EventService _sut;

    public EventServiceTests()
    {
        _eventRepositoryMock = Substitute.For<IEventRepository>();
        _slugGeneratorMock = Substitute.For<ISlugGenerator>();
        _jobRepositoryMock = Substitute.For<IDataRetentionJobRepository>();
        _messageTemplateServiceMock = Substitute.For<IMessageTemplateService>();
        _queueServiceMock = Substitute.For<IQueueService>();
        _configurationMock = Substitute.For<IConfiguration>();
        _configurationMock["MicrositeBaseUrl"].Returns("http://localhost:4200/e");

        _sut = new EventService(
            _eventRepositoryMock,
            _slugGeneratorMock,
            _jobRepositoryMock,
            _messageTemplateServiceMock,
            _queueServiceMock,
            _configurationMock);
    }

    [Fact]
    public async Task CreateEventAsync_ShouldCreateEventAndRetentionJob()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var request = new CreateEventRequest
        {
            Name = "My Wedding",
            EventDate = new DateTimeOffset(2024, 10, 10, 0, 0, 0, TimeSpan.Zero),
            CoupleNames = "John & Jane",
            VenueName = "The Venue",
            VenueAddress = "123 Street"
        };

        _slugGeneratorMock.GenerateSlug(request.Name, 2024).Returns("my-wedding-2024");
        _eventRepositoryMock.ExistsBySlugAsync("my-wedding-2024").Returns(false);

        // Act
        var result = await _sut.CreateEventAsync(userId, request);

        // Assert
        result.Should().NotBeNull();
        result.Slug.Should().Be("my-wedding-2024");
        
        await _eventRepositoryMock.Received(1).AddAsync(Arg.Is<Event>(e => 
            e.Name == "My Wedding" && 
            e.Slug == "my-wedding-2024" &&
            e.UserId == userId));
            
        await _jobRepositoryMock.Received(1).AddAsync(Arg.Is<DataRetentionJob>(j => 
            j.ScheduledDeleteAt == request.EventDate.AddDays(1).AddDays(30)));
    }

    [Fact]
    public async Task CreateEventAsync_ShouldHandleDuplicateSlugs()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var request = new CreateEventRequest
        {
            Name = "My Wedding",
            EventDate = new DateTimeOffset(2024, 10, 10, 0, 0, 0, TimeSpan.Zero)
        };

        _slugGeneratorMock.GenerateSlug(request.Name, 2024).Returns("my-wedding-2024");
        _eventRepositoryMock.ExistsBySlugAsync("my-wedding-2024").Returns(true);
        _eventRepositoryMock.ExistsBySlugAsync("my-wedding-2024-2").Returns(true);
        _eventRepositoryMock.ExistsBySlugAsync("my-wedding-2024-3").Returns(false);

        // Act
        var result = await _sut.CreateEventAsync(userId, request);

        // Assert
        result.Slug.Should().Be("my-wedding-2024-3");
    }

    [Fact]
    public async Task GetEventBySlugAsync_WhenEventIsPublished_ShouldReturnMicrositeUrl()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var ev = new Event
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Name = "My Wedding",
            Slug = "my-wedding-2024",
            Status = EventStatus.Published,
            EventDate = new DateTimeOffset(2024, 10, 10, 0, 0, 0, TimeSpan.Zero),
            EventEndDate = new DateTimeOffset(2024, 10, 11, 0, 0, 0, TimeSpan.Zero),
            CoupleNames = "John & Jane",
            VenueName = "The Venue",
            VenueAddress = "123 Street",
            Guests = new List<Guest>()
        };

        _eventRepositoryMock.GetBySlugAsync("my-wedding-2024").Returns(ev);

        // Act
        var result = await _sut.GetEventBySlugAsync("my-wedding-2024", userId);

        // Assert
        result.Should().NotBeNull();
        result!.MicrositeUrl.Should().Be("http://localhost:4200/e/my-wedding-2024");
    }

    [Fact]
    public async Task GetEventBySlugAsync_WhenEventIsDraft_ShouldNotReturnMicrositeUrl()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var ev = new Event
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Name = "My Wedding",
            Slug = "my-wedding-2024",
            Status = EventStatus.Draft,
            EventDate = new DateTimeOffset(2024, 10, 10, 0, 0, 0, TimeSpan.Zero),
            EventEndDate = new DateTimeOffset(2024, 10, 11, 0, 0, 0, TimeSpan.Zero),
            CoupleNames = "John & Jane",
            VenueName = "The Venue",
            VenueAddress = "123 Street",
            Guests = new List<Guest>()
        };

        _eventRepositoryMock.GetBySlugAsync("my-wedding-2024").Returns(ev);

        // Act
        var result = await _sut.GetEventBySlugAsync("my-wedding-2024", userId);

        // Assert
        result.Should().NotBeNull();
        result!.MicrositeUrl.Should().BeNull();
    }
}
