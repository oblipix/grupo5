using FluentAssertions;
using ViagemImpacta.DTO.Hotel;

namespace ViagemImpacta.Tests.DTOs.Hotel
{
    /// <summary>
    /// ?? Testes unitários para HotelResponse DTO
    /// </summary>
    public class HotelResponseTests
    {
        /// <summary>
        /// Teste: Verifica inicialização padrão do HotelResponse
        /// </summary>
        [Fact]
        public void HotelResponse_ShouldInitializeWithDefaultValues()
        {
            // Arrange & Act
            var response = new HotelResponse();

            // Assert
            response.Id.Should().Be(0);
            response.Name.Should().Be(string.Empty);
            response.HotelAddress.Should().Be(string.Empty);
            response.Phone.Should().Be(string.Empty);
            response.Stars.Should().Be(0);
            response.HasWifi.Should().BeFalse();
            response.HasParking.Should().BeFalse();
            response.HasGym.Should().BeFalse();
            response.HasRestaurant.Should().BeFalse();
        }

        /// <summary>
        /// Teste: Verifica se todas as propriedades podem ser definidas
        /// </summary>
        [Fact]
        public void HotelResponse_ShouldSetAllPropertiesCorrectly()
        {
            // Arrange & Act
            var response = new HotelResponse
            {
                Id = 42,
                Name = "Hotel Copacabana Palace",
                HotelAddress = "Rio de Janeiro, RJ",
                Phone = "(21) 2548-7070",
                Stars = 5,
                HasWifi = true,
                HasParking = true,
                HasGym = true,
                HasRestaurant = true
            };

            // Assert
            response.Id.Should().Be(42);
            response.Name.Should().Be("Hotel Copacabana Palace");
            response.HotelAddress.Should().Be("Rio de Janeiro, RJ");
            response.Phone.Should().Be("(21) 2548-7070");
            response.Stars.Should().Be(5);
            response.HasWifi.Should().BeTrue();
            response.HasParking.Should().BeTrue();
            response.HasGym.Should().BeTrue();
            response.HasRestaurant.Should().BeTrue();
        }

        /// <summary>
        /// Teste: Verifica se número de estrelas aceita valores válidos (1-5)
        /// </summary>
        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        public void HotelResponse_Stars_ShouldAcceptValidStarRatings(int stars)
        {
            // Arrange & Act
            var response = new HotelResponse
            {
                Stars = stars
            };

            // Assert
            response.Stars.Should().Be(stars);
        }
    }
}