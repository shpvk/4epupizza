using ChepuPizza.DAL.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChepuPizza.DAL.Data
{
    public class CheeseConfiguration : IEntityTypeConfiguration<Cheese>
    {
        public void Configure(EntityTypeBuilder<Cheese> builder)
        {
            builder.ToTable("Cheeses");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Price)
                .IsRequired()
                .HasColumnType("decimal(10,2)");

            builder.Property(x => x.Name)
                .IsRequired();
        }
    }


}