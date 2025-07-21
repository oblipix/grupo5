using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ViagemImpacta.Migrations
{
    /// <inheritdoc />
    public partial class CreateInitial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hotels_TravelPackages_TravelPackageId",
                table: "Hotels");

            migrationBuilder.DropIndex(
                name: "IX_Hotels_TravelPackageId",
                table: "Hotels");

            migrationBuilder.DropColumn(
                name: "TravelPackageId",
                table: "Hotels");

            migrationBuilder.CreateTable(
                name: "HotelTravelPackage",
                columns: table => new
                {
                    HotelsHotelId = table.Column<int>(type: "int", nullable: false),
                    TravelPackageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelTravelPackage", x => new { x.HotelsHotelId, x.TravelPackageId });
                    table.ForeignKey(
                        name: "FK_HotelTravelPackage_Hotels_HotelsHotelId",
                        column: x => x.HotelsHotelId,
                        principalTable: "Hotels",
                        principalColumn: "HotelId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HotelTravelPackage_TravelPackages_TravelPackageId",
                        column: x => x.TravelPackageId,
                        principalTable: "TravelPackages",
                        principalColumn: "TravelPackageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HotelTravelPackage_TravelPackageId",
                table: "HotelTravelPackage",
                column: "TravelPackageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HotelTravelPackage");

            migrationBuilder.AddColumn<int>(
                name: "TravelPackageId",
                table: "Hotels",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_TravelPackageId",
                table: "Hotels",
                column: "TravelPackageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hotels_TravelPackages_TravelPackageId",
                table: "Hotels",
                column: "TravelPackageId",
                principalTable: "TravelPackages",
                principalColumn: "TravelPackageId");
        }
    }
}
