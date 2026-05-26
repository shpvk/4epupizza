using ChepuPizza.DAL.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChepuPizza.DAL.Data
{
    public class PizzaConfiguration : IEntityTypeConfiguration<Pizza>
    {
        public void Configure(EntityTypeBuilder<Pizza> builder)
        {
            builder.ToTable("Pizzas");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Price)
                .IsRequired()
                .HasColumnType("decimal(10,2)");

            builder.HasOne(p => p.Cheese)
                .WithMany(c => c.Pizzas)
                .HasForeignKey(p => p.CheeseId);

            builder.Property(x => x.ImageUrl)
                .HasColumnName("ImageUrl")
                .IsRequired();
        }
    }


}