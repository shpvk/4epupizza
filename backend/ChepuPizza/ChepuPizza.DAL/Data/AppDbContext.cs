using ChepuPizza.DAL.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChepuPizza.DAL.Data
{

    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new PizzaConfiguration());
            modelBuilder.ApplyConfiguration(new IngredientConfiguration());
            modelBuilder.ApplyConfiguration(new PizzaIngredientConfiguration());

            base.OnModelCreating(modelBuilder);
        }
        

    }
}