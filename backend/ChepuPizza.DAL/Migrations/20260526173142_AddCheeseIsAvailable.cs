using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChepuPizza.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddCheeseIsAvailable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Cheeses");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Cheeses",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
