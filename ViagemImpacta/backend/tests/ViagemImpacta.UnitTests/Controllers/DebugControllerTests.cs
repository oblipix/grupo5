using Microsoft.AspNetCore.Mvc;
using ViagemImpacta.Controllers.ApiControllers;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Repositories;
using ViagemImpacta.Models;

namespace ViagemImpacta.UnitTests.Controllers;

/// <summary>
/// Testes unitários para DebugController
/// Verifica funcionalidades de debug e fail-fast do sistema
/// </summary>
public class DebugControllerTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IHotelRepository> _mockHotelRepository;
    private readonly DebugController _controller;

    public DebugControllerTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockHotelRepository = new Mock<IHotelRepository>();
        _mockUnitOfWork.Setup(x => x.Hotels).Returns(_mockHotelRepository.Object);
        _controller = new DebugController(_mockUnitOfWork.Object);
    }

    [Fact]
    public async Task TestFailFast_WithValidParameters_ShouldReturnOk()
    {
        // Arrange
        var destination = "São Paulo";
        decimal? minPrice = 100;
        decimal? maxPrice = 500;
        int? stars = 4;
        var roomType = "Luxo";
        var amenities = "wifi,pool";
        int? guests = 2;
        var checkIn = "2024-12-01";
        var checkOut = "2024-12-05";

        var mockHotels = new List<Hotel>
        {
            new Hotel { HotelId = 1, Name = "Hotel Test 1" },
            new Hotel { HotelId = 2, Name = "Hotel Test 2" }
        };

        _mockHotelRepository.Setup(x => x.SearchHotelsAsync(
            destination, minPrice, maxPrice, stars, roomType,
            amenities, guests, checkIn, checkOut))
            .ReturnsAsync(mockHotels);

        // Act
        var result = await _controller.TestFailFast(
            destination, minPrice, maxPrice, stars, roomType,
            amenities, guests, checkIn, checkOut);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = result as OkObjectResult;
        okResult?.Value.Should().NotBeNull();
    }

    [Fact]
    public async Task TestFailFast_WithNullParameters_ShouldHandleGracefully()
    {
        // Arrange
        var emptyResults = new List<Hotel>();

        _mockHotelRepository.Setup(x => x.SearchHotelsAsync(
            It.IsAny<string>(), It.IsAny<decimal?>(), It.IsAny<decimal?>(),
            It.IsAny<int?>(), It.IsAny<string>(), It.IsAny<string>(),
            It.IsAny<int?>(), It.IsAny<string>(), It.IsAny<string>()))
            .ReturnsAsync(emptyResults);

        // Act
        var result = await _controller.TestFailFast(
            null, null, null, null, null, null, null, null, null);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task TestFailFast_WithTypicalScenario_ShouldProcessCorrectly()
    {
        // Arrange
        var mockResults = new List<Hotel> { new Hotel { HotelId = 1, Name = "Test Hotel" } };

        _mockHotelRepository.Setup(x => x.SearchHotelsAsync(
            It.IsAny<string>(), It.IsAny<decimal?>(), It.IsAny<decimal?>(),
            It.IsAny<int?>(), It.IsAny<string>(), It.IsAny<string>(),
            It.IsAny<int?>(), It.IsAny<string>(), It.IsAny<string>()))
            .ReturnsAsync(mockResults);

        // Act
        var result = await _controller.TestFailFast(
            "Rio de Janeiro", 200m, 800m, 5, "Standard",
            "wifi,parking", 2, "2025-01-15", "2025-01-20");

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = result as OkObjectResult;
        okResult?.Value.Should().NotBeNull();

        // Verify repository was called
        _mockHotelRepository.Verify(x => x.SearchHotelsAsync(
            "Rio de Janeiro", 200m, 800m, 5, "Standard",
            "wifi,parking", 2, "2025-01-15", "2025-01-20"), Times.Once);
    }

    [Theory]
    [InlineData("São Paulo", 1, 5)]
    [InlineData("Rio de Janeiro", 3, 5)]
    [InlineData("Brasília", 4, 5)]
    public async Task TestFailFast_WithDifferentDestinations_ShouldReturnResults(
        string destination, int minStars, int maxStars)
    {
        // Arrange
        var mockResults = new List<Hotel>
        {
            new Hotel { HotelId = 1, Name = $"Hotel in {destination}" }
        };

        _mockHotelRepository.Setup(x => x.SearchHotelsAsync(
            destination, It.IsAny<decimal?>(), It.IsAny<decimal?>(),
            It.IsAny<int?>(), It.IsAny<string>(), It.IsAny<string>(),
            It.IsAny<int?>(), It.IsAny<string>(), It.IsAny<string>()))
            .ReturnsAsync(mockResults);

        // Act
        var result = await _controller.TestFailFast(
            destination, null, null, minStars, null, null, null, null, null);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task TestFailFast_WithRepository_ShouldCallCorrectMethods()
    {
        // Arrange
        var expectedHotels = new List<Hotel>();
        _mockHotelRepository.Setup(x => x.SearchHotelsAsync(
            It.IsAny<string>(), It.IsAny<decimal?>(), It.IsAny<decimal?>(),
            It.IsAny<int?>(), It.IsAny<string>(), It.IsAny<string>(),
            It.IsAny<int?>(), It.IsAny<string>(), It.IsAny<string>()))
            .ReturnsAsync(expectedHotels);

        // Act
        await _controller.TestFailFast(
            "Test", 100m, 200m, 3, "Standard", "wifi", 2, "2025-01-01", "2025-01-02");

        // Assert
        _mockUnitOfWork.Verify(x => x.Hotels, Times.AtLeastOnce);
        _mockHotelRepository.Verify(x => x.SearchHotelsAsync(
            "Test", 100m, 200m, 3, "Standard", "wifi", 2, "2025-01-01", "2025-01-02"),
            Times.Once);
    }
}
