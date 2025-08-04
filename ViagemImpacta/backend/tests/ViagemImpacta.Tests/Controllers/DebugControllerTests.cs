using Microsoft.AspNetCore.Mvc;
using Xunit;
using FluentAssertions;
using ViagemImpacta.Controllers.ApiControllers;
using ViagemImpacta.Repositories.Interfaces;
using ViagemImpacta.Repositories;
using ViagemImpacta.Models;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ViagemImpacta.Tests.Controllers
{
    /// <summary>
    /// Testes para funcionalidades de debug e fail-fast do sistema
    /// Movido do projeto principal para seguir boas práticas de organização
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
            var okResult = result as OkObjectResult;
            okResult?.Value.Should().NotBeNull();
        }

        [Theory]
        [InlineData("Rio de Janeiro", 200, 800, 5, "Suíte", "wifi,pool,gym", 2, "2024-12-15", "2024-12-20")]
        [InlineData("Salvador", 150, 600, 4, "Standard", "parking,restaurant", 4, "2024-11-10", "2024-11-15")]
        [InlineData("Recife", 100, 400, 3, "Luxo", "bar,accessibility", 1, "2024-10-05", "2024-10-10")]
        public async Task TestFailFast_WithVariousParameterCombinations_ShouldWork(
            string destination, decimal minPrice, decimal maxPrice, int stars,
            string roomType, string amenities, int guests, string checkIn, string checkOut)
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
                destination, minPrice, maxPrice, stars, roomType,
                amenities, guests, checkIn, checkOut);

            // Assert
            result.Should().BeOfType<OkObjectResult>();

            // Verify that the method was called with correct parameters
            _mockHotelRepository.Verify(x => x.SearchHotelsAsync(
                destination, minPrice, maxPrice, stars, roomType,
                amenities, guests, checkIn, checkOut), Times.Once);
        }
    }
}
