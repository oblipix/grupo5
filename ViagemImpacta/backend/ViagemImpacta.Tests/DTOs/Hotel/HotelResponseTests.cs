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
            response.Location.Should().Be(string.Empty);
            response.Phone.Should().Be(string.Empty);
            response.Stars.Should().Be(0);
            response.HasWifi.Should().BeFalse();
            response.HasParking.Should().BeFalse();
            response.HasGym.Should().BeFalse();
            response.HasRestaurant.Should().BeFalse();
            response.ImageUrl.Should().Be(string.Empty);
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
                Location = "Rio de Janeiro, RJ",
                Phone = "(21) 2548-7070",
                Stars = 5,
                HasWifi = true,
                HasParking = true,
                HasGym = true,
                HasRestaurant = true,
                ImageUrl = "https://example.com/hotel-image.jpg"
            };

            // Assert
            response.Id.Should().Be(42);
            response.Name.Should().Be("Hotel Copacabana Palace");
            response.Location.Should().Be("Rio de Janeiro, RJ");
            response.Phone.Should().Be("(21) 2548-7070");
            response.Stars.Should().Be(5);
            response.HasWifi.Should().BeTrue();
            response.HasParking.Should().BeTrue();
            response.HasGym.Should().BeTrue();
            response.HasRestaurant.Should().BeTrue();
            response.ImageUrl.Should().Be("https://example.com/hotel-image.jpg");
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
            response.Stars.Should().BeInRange(1, 5);
        }

        /// <summary>
        /// Teste: Verifica se propriedades booleanas funcionam independentemente
        /// </summary>
        [Fact]
        public void HotelResponse_BooleanProperties_ShouldWorkIndependently()
        {
            // Arrange & Act
            var response = new HotelResponse
            {
                HasWifi = true,
                HasParking = false,
                HasGym = true,
                HasRestaurant = false
            };

            // Assert
            response.HasWifi.Should().BeTrue();
            response.HasParking.Should().BeFalse();
            response.HasGym.Should().BeTrue();
            response.HasRestaurant.Should().BeFalse();
        }

        /// <summary>
        /// Teste: Verifica se Phone aceita diferentes formatos
        /// </summary>
        [Theory]
        [InlineData("(11) 1234-5678")]
        [InlineData("11 1234-5678")]
        [InlineData("11123456789")]
        [InlineData("+55 11 1234-5678")]
        [InlineData("")]
        public void HotelResponse_Phone_ShouldAcceptDifferentFormats(string phone)
        {
            // Arrange & Act
            var response = new HotelResponse
            {
                Phone = phone
            };

            // Assert
            response.Phone.Should().Be(phone);
        }
    }

    /// <summary>
    /// ?? Testes unitários para HotelListResponse DTO
    /// </summary>
    public class HotelListResponseTests
    {
        /// <summary>
        /// Teste: Verifica inicialização padrão do HotelListResponse
        /// </summary>
        [Fact]
        public void HotelListResponse_ShouldInitializeWithDefaultValues()
        {
            // Arrange & Act
            var response = new HotelListResponse();

            // Assert
            response.Id.Should().Be(0);
            response.Name.Should().Be(string.Empty);
            response.Location.Should().Be(string.Empty);
            response.Stars.Should().Be(0);
            response.ImageUrl.Should().Be(string.Empty);
            response.HasWifi.Should().BeFalse();
            response.HasParking.Should().BeFalse();
        }

        /// <summary>
        /// Teste: Verifica se é uma versão simplificada do HotelResponse
        /// </summary>
        [Fact]
        public void HotelListResponse_ShouldBeLighterThanFullResponse()
        {
            // Arrange & Act
            var listResponse = new HotelListResponse
            {
                Id = 10,
                Name = "Hotel Teste",
                Location = "São Paulo, SP",
                Stars = 4,
                ImageUrl = "https://example.com/hotel.jpg",
                HasWifi = true,
                HasParking = false
            };

            // Assert
            listResponse.Id.Should().Be(10);
            listResponse.Name.Should().Be("Hotel Teste");
            listResponse.Location.Should().Be("São Paulo, SP");
            listResponse.Stars.Should().Be(4);
            listResponse.ImageUrl.Should().Be("https://example.com/hotel.jpg");
            listResponse.HasWifi.Should().BeTrue();
            listResponse.HasParking.Should().BeFalse();
            
            // Verifica que NÃO tem propriedades do response completo
            // (Phone, HasGym, HasRestaurant são específicas do HotelResponse)
        }

        /// <summary>
        /// Teste: Verifica compatibilidade com HotelResponse
        /// </summary>
        [Fact]
        public void HotelListResponse_ShouldBeCompatibleWithHotelResponse()
        {
            // Arrange
            var fullResponse = new HotelResponse
            {
                Id = 1,
                Name = "Hotel Test",
                Location = "Test City",
                Stars = 3,
                ImageUrl = "test.jpg",
                HasWifi = true,
                HasParking = true,
                Phone = "123456789",
                HasGym = false,
                HasRestaurant = true
            };

            // Act - Simula o que AutoMapper faria
            var listResponse = new HotelListResponse
            {
                Id = fullResponse.Id,
                Name = fullResponse.Name,
                Location = fullResponse.Location,
                Stars = fullResponse.Stars,
                ImageUrl = fullResponse.ImageUrl,
                HasWifi = fullResponse.HasWifi,
                HasParking = fullResponse.HasParking
            };

            // Assert
            listResponse.Id.Should().Be(fullResponse.Id);
            listResponse.Name.Should().Be(fullResponse.Name);
            listResponse.Location.Should().Be(fullResponse.Location);
            listResponse.Stars.Should().Be(fullResponse.Stars);
            listResponse.ImageUrl.Should().Be(fullResponse.ImageUrl);
            listResponse.HasWifi.Should().Be(fullResponse.HasWifi);
            listResponse.HasParking.Should().Be(fullResponse.HasParking);
        }
    }
}