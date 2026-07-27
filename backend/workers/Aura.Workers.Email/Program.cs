using Aura.Infrastructure;
using Aura.Workers.Email;

var builder = Host.CreateApplicationBuilder(args);

// Add infrastructure services (includes Queue, Email, DbContext)
builder.Services.AddInfrastructure(builder.Configuration);


// Add the email dispatcher worker
builder.Services.AddHostedService<EmailDispatcherWorker>();

var host = builder.Build();
host.Run();
