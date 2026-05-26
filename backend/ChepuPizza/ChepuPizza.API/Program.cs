using ChepuPizza.BLL.Interfaces;
using ChepuPizza.BLL.Services;
using ChepuPizza.DAL;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Repositories;

namespace ChepuPizza.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

            builder.Services.AddScoped<IPizzaService, PizzaService>();
            builder.Services.AddScoped<IPizzaRepository, PizzaRepository>();

            builder.Services.AddDatabase(builder.Configuration);

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
