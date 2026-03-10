using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConnectionEngine.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserProfileStructureWithIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UserPreferences_MinPreferredAge_MaxPreferredAge",
                table: "UserPreferences",
                columns: new[] { "MinPreferredAge", "MaxPreferredAge" });

            migrationBuilder.CreateIndex(
                name: "IX_UserLocations_Lattitude_Longitude",
                table: "UserLocations",
                columns: new[] { "Lattitude", "Longitude" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserPreferences_MinPreferredAge_MaxPreferredAge",
                table: "UserPreferences");

            migrationBuilder.DropIndex(
                name: "IX_UserLocations_Lattitude_Longitude",
                table: "UserLocations");
        }
    }
}
