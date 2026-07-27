using Aura.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Aura.Infrastructure.Data.Configurations;

public class TemplateConfiguration : IEntityTypeConfiguration<Template>
{
    public void Configure(EntityTypeBuilder<Template> builder)
    {
        builder.HasKey(e => e.Id);
        
        builder.HasIndex(e => e.Category);
        
        builder.Property(e => e.Name).HasMaxLength(100).IsRequired();
        builder.Property(e => e.PreviewUrl).HasMaxLength(500).IsRequired();
        builder.Property(e => e.Category).HasMaxLength(50);
        builder.Property(e => e.LayoutJson).HasColumnType("jsonb");

        builder.HasData(
            new Template { Id = new Guid("11111111-1111-1111-1111-111111111111"), Name = "Classic Aura", Description = "A classic and elegant design with floral touches.", Category = "wedding", PreviewUrl = "/assets/templates/classic.jpg", IsPremium = false, LayoutJson = "{}", CreatedAt = new DateTimeOffset(new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) },
            new Template { Id = new Guid("22222222-2222-2222-2222-222222222222"), Name = "Modern Minimalist", Description = "Clean lines and ample whitespace for a contemporary look.", Category = "wedding", PreviewUrl = "/assets/templates/modern.jpg", IsPremium = false, LayoutJson = "{}", CreatedAt = new DateTimeOffset(new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) },
            new Template { Id = new Guid("33333333-3333-3333-3333-333333333333"), Name = "Rustic Charm", Description = "Warm and inviting, perfect for country or outdoor weddings.", Category = "wedding", PreviewUrl = "/assets/templates/rustic.jpg", IsPremium = false, LayoutJson = "{}", CreatedAt = new DateTimeOffset(new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) },
            new Template { Id = new Guid("44444444-4444-4444-4444-444444444444"), Name = "Premium Gold", Description = "Luxurious gold accents for a premium feel.", Category = "wedding", PreviewUrl = "/assets/templates/premium.jpg", IsPremium = true, LayoutJson = "{}", CreatedAt = new DateTimeOffset(new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)) }
        );
    }
}
