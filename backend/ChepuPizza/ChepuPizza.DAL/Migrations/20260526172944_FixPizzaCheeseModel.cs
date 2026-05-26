using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChepuPizza.DAL.Migrations
{
    /// <inheritdoc />
    public partial class FixPizzaCheeseModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Cheeses",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Cheeses");
        }
    }
}
