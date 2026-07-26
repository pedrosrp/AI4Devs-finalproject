using Aura.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace TestApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseNpgsql(""Host=localhost;Port=5432;Database=auraplanning_dev;Username=postgres;Password=postgres"")
                .Options;
            
            using var context = new ApplicationDbContext(options);
            var templates = context.Templates.ToList();
            Console.WriteLine($""Total templates: {templates.Count}"");
            foreach (var t in templates)
            {
                Console.WriteLine($""{t.Id} - {t.Name}"");
            }
        }
    }
}
