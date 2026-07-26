using System;
using Microsoft.Extensions.Configuration;

class Program {
    static void Main() {
        Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection", "MyConnectionString");
        var config = new ConfigurationBuilder().AddEnvironmentVariables().Build();
        Console.WriteLine("Value: " + config.GetConnectionString("DefaultConnection"));
        
        Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection", null);
        Environment.SetEnvironmentVariable("ConnectionStrings:DefaultConnection", "MyConnectionString2");
        config = new ConfigurationBuilder().AddEnvironmentVariables().Build();
        Console.WriteLine("Value2: " + config.GetConnectionString("DefaultConnection"));
    }
}
