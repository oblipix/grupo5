using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ViagemImpacta.Migrations
{
    /// <inheritdoc />
    public partial class populateDb : Migration
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

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Users",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Cpf",
                table: "Users",
                type: "nvarchar(14)",
                maxLength: 14,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "TravelPackages",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Destination",
                table: "TravelPackages",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "TravelPackages",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Hotels",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Hotels",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Hotels",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "TravelPackageHotels",
                columns: table => new
                {
                    HotelsHotelId = table.Column<int>(type: "int", nullable: false),
                    TravelPackageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TravelPackageHotels", x => new { x.HotelsHotelId, x.TravelPackageId });
                    table.ForeignKey(
                        name: "FK_TravelPackageHotels_Hotels_HotelsHotelId",
                        column: x => x.HotelsHotelId,
                        principalTable: "Hotels",
                        principalColumn: "HotelId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TravelPackageHotels_TravelPackages_TravelPackageId",
                        column: x => x.TravelPackageId,
                        principalTable: "TravelPackages",
                        principalColumn: "TravelPackageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Hotels",
                columns: new[] { "HotelId", "Gym", "Image", "Location", "Name", "Parking", "Phone", "Restaurant", "Stars", "Wifi" },
                values: new object[,]
                {
                    { 1, true, "copacabana-palace.jpg", "Rio de Janeiro, RJ", "Hotel Copacabana Palace", true, "(21) 2548-7070", true, 5, true },
                    { 2, true, "grand-hyatt-sp.jpg", "São Paulo, SP", "Grand Hyatt São Paulo", true, "(11) 2838-1234", true, 5, true },
                    { 3, true, "belmond-cataratas.jpg", "Foz do Iguaçu, PR", "Belmond Hotel das Cataratas", true, "(45) 2102-7000", true, 5, true },
                    { 4, false, "pousada-maravilha.jpg", "Fernando de Noronha, PE", "Pousada Maravilha", false, "(81) 3619-0028", true, 4, true },
                    { 5, true, "fasano-salvador.jpg", "Salvador, BA", "Hotel Fasano Salvador", true, "(71) 3206-6000", true, 5, true },
                    { 6, true, "casa-grande-gramado.jpg", "Gramado, RS", "Casa Grande Hotel Resort", true, "(54) 3295-1100", true, 4, true },
                    { 7, true, "tivoli-praia-forte.jpg", "Praia do Forte, BA", "Tivoli Ecoresort Praia do Forte", true, "(71) 3676-4000", true, 5, true },
                    { 8, true, "emiliano-sp.jpg", "São Paulo, SP", "Hotel Emiliano", true, "(11) 3069-4369", true, 5, true },
                    { 9, false, "pousada-etnia.jpg", "Trancoso, BA", "Pousada Etnia", true, "(73) 3668-1137", true, 4, true },
                    { 10, false, "villa-bahia.jpg", "Salvador, BA", "Hotel Villa Bahia", false, "(71) 3322-4271", true, 4, true },
                    { 11, false, "pousada-toby.jpg", "Búzios, RJ", "Pousada do Toby", true, "(22) 2623-1424", true, 4, true },
                    { 12, true, "amazonia-golf.jpg", "Manaus, AM", "Amazonia Golf Resort", true, "(92) 3215-7000", true, 4, true }
                });

            migrationBuilder.InsertData(
                table: "TravelPackages",
                columns: new[] { "TravelPackageId", "Active", "CreatedAt", "Description", "Destination", "EndDate", "Price", "Promotion", "StartDate", "Title", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1859), "Explore a Cidade Maravilhosa com hospedagem no icônico Copacabana Palace. Inclui city tour, Cristo Redentor e Pão de Açúcar.", "Rio de Janeiro", new DateTime(2025, 8, 24, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1859), 2850.00m, false, new DateTime(2025, 8, 19, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1842), "Rio de Janeiro Clássico", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1860) },
                    { 2, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1898), "Conheça a metrópole brasileira com conforto no Grand Hyatt. Inclui tours gastronômicos e culturais.", "São Paulo", new DateTime(2025, 9, 6, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1897), 1750.00m, true, new DateTime(2025, 9, 3, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1896), "São Paulo Business & Lazer", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1898) },
                    { 3, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1901), "Experimente uma das maravilhas naturais do mundo com hospedagem exclusiva no Belmond Hotel das Cataratas.", "Foz do Iguaçu", new DateTime(2025, 9, 22, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1901), 3200.00m, false, new DateTime(2025, 9, 18, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1900), "Cataratas do Iguaçu Luxo", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1902) },
                    { 4, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1905), "Paraíso ecológico com hospedagem na Pousada Maravilha. Inclui mergulho e trilhas ecológicas.", "Fernando de Noronha", new DateTime(2025, 10, 25, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1904), 4500.00m, false, new DateTime(2025, 10, 18, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1904), "Fernando de Noronha Exclusivo", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1905) },
                    { 5, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1908), "Mergulhe na cultura baiana com hospedagem no Fasano Salvador. City tour pelo Pelourinho incluído.", "Salvador", new DateTime(2025, 10, 7, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1908), 2100.00m, true, new DateTime(2025, 10, 3, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1907), "Salvador Cultural", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1909) },
                    { 6, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1913), "Charme da Serra Gaúcha no Casa Grande Hotel Resort. Inclui degustações e passeios românticos.", "Gramado", new DateTime(2025, 9, 12, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1912), 1890.00m, false, new DateTime(2025, 9, 8, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1911), "Gramado Romântico", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1913) },
                    { 7, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1916), "Resort all inclusive no Tivoli Ecoresort. Inclui todas as refeições e atividades aquáticas.", "Praia do Forte", new DateTime(2025, 9, 5, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1915), 3800.00m, true, new DateTime(2025, 8, 29, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1915), "Praia do Forte All Inclusive", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1917) },
                    { 8, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1920), "Experiência premium no Hotel Emiliano. Inclui jantares em restaurantes estrelados.", "São Paulo", new DateTime(2025, 8, 27, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1919), 2950.00m, false, new DateTime(2025, 8, 24, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1918), "São Paulo Premium", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1920) },
                    { 9, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1923), "Charme e sofisticação na Pousada Etnia. Inclui passeios pela Costa do Descobrimento.", "Trancoso", new DateTime(2025, 10, 14, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1922), 3150.00m, false, new DateTime(2025, 10, 8, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1922), "Trancoso Boutique", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1924) },
                    { 10, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1927), "Imersão na história brasileira no Hotel Villa Bahia. City tour pelo centro histórico incluído.", "Salvador", new DateTime(2025, 9, 17, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1927), 1680.00m, true, new DateTime(2025, 9, 13, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1926), "Salvador Histórico", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1928) },
                    { 11, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1931), "Relax e charme na Pousada do Toby. Inclui passeios de barco pelas praias mais belas.", "Búzios", new DateTime(2025, 9, 28, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1930), 2240.00m, false, new DateTime(2025, 9, 23, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1929), "Búzios Charmoso", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1931) },
                    { 12, true, new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1934), "Aventura na floresta amazônica no Amazonia Golf Resort. Inclui pesca esportiva e trilhas ecológicas.", "Manaus", new DateTime(2025, 11, 4, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1933), 2780.00m, false, new DateTime(2025, 10, 28, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1933), "Amazônia Aventura", new DateTime(2025, 7, 20, 12, 11, 26, 357, DateTimeKind.Local).AddTicks(1935) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TravelPackageHotels_TravelPackageId",
                table: "TravelPackageHotels",
                column: "TravelPackageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TravelPackageHotels");

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "HotelId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "TravelPackages",
                keyColumn: "TravelPackageId",
                keyValue: 12);

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(15)",
                oldMaxLength: 15);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Cpf",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(14)",
                oldMaxLength: 14);

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "TravelPackages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Destination",
                table: "TravelPackages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "TravelPackages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Phone",
                table: "Hotels",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Hotels",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Hotels",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300);

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
