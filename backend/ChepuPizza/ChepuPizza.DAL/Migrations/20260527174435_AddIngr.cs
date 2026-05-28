using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ChepuPizza.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddIngr : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pizzas_Cheeses_CheeseId",
                table: "Pizzas");

            migrationBuilder.DropTable(
                name: "Cheeses");

            migrationBuilder.DropIndex(
                name: "IX_Pizzas_CheeseId",
                table: "Pizzas");

            migrationBuilder.DropColumn(
                name: "CheeseId",
                table: "Pizzas");

            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "Pizzas",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Price = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    IsAvailable = table.Column<bool>(type: "boolean", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "Pizzas");

            migrationBuilder.AddColumn<int>(
                name: "CheeseId",
                table: "Pizzas",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Cheeses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IsAvailable = table.Column<bool>(type: "boolean", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cheeses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pizzas_CheeseId",
                table: "Pizzas",
                column: "CheeseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pizzas_Cheeses_CheeseId",
                table: "Pizzas",
                column: "CheeseId",
                principalTable: "Cheeses",
                principalColumn: "Id");
        }
    }
}
