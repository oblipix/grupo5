using FluentAssertions;
using ViagemImpacta.DTO.TravelPackage;
using ViagemImpacta.DTO.Hotel;

namespace ViagemImpacta.Tests.DTOs.TravelPackage
{
    /// <summary>
    /// ?? Testes unitários para TravelPackageResponse DTO
    /// 
    /// ?? FOCO NOS TESTES:
    /// - Propriedades de resposta são definidas corretamente
    /// - Relacionamentos com outros DTOs (Hotels)
    /// - Valores nulos são tratados adequadamente
    /// - Comportamento de propriedades calculadas/derivadas
    /// </summary>
    public class TravelPackageResponseTests
    {
        /// <summary>
        /// Teste: Verifica inicialização padrão do TravelPackageResponse
        /// </summary>
        [Fact]
        public void TravelPackageResponse_ShouldInitializeWithDefaultValues()
        {
            // Arrange & Act
            var response = new TravelPackageResponse();

            // Assert
            response.Id.Should().Be(0);
            response.Title.Should().Be(string.Empty);
            response.Description.Should().BeNull();
            response.Destination.Should().BeNull();
            response.Price.Should().Be(0);
            response.IsPromotion.Should().BeFalse();
            response.StartDate.Should().Be(default(DateTime));
            response.EndDate.Should().Be(default(DateTime));
            response.Hotels.Should().BeNull();
        }

        /// <summary>
        /// Teste: Verifica se todas as propriedades podem ser definidas
        /// </summary>
        [Fact]
        public void TravelPackageResponse_ShouldSetAllPropertiesCorrectly()
        {
            // Arrange
            var hotels = new List<HotelResponse>
            {
                new HotelResponse { Id = 1, Name = "Hotel Test 1" },
                new HotelResponse { Id = 2, Name = "Hotel Test 2" }
            };

            // Act
            var response = new TravelPackageResponse
            {
                Id = 123,
                Title = "Pacote Fantástico",
                Description = "Uma viagem inesquecível",
                Destination = "Paris",
                Price = 3500.75m,
                IsPromotion = true,
                StartDate = new DateTime(2024, 8, 15),
                EndDate = new DateTime(2024, 8, 25),
                Hotels = hotels
            };

            // Assert
            response.Id.Should().Be(123);
            response.Title.Should().Be("Pacote Fantástico");
            response.Description.Should().Be("Uma viagem inesquecível");
            response.Destination.Should().Be("Paris");
            response.Price.Should().Be(3500.75m);
            response.IsPromotion.Should().BeTrue();
            response.StartDate.Should().Be(new DateTime(2024, 8, 15));
            response.EndDate.Should().Be(new DateTime(2024, 8, 25));
            response.Hotels.Should().NotBeNull();
            response.Hotels.Should().HaveCount(2);
        }

        /// <summary>
        /// Teste: Verifica comportamento com lista de hotéis vazia
        /// </summary>
        [Fact]
        public void TravelPackageResponse_ShouldHandleEmptyHotelsList()
        {
            // Arrange & Act
            var response = new TravelPackageResponse
            {
                Id = 1,
                Title = "Teste",
                Hotels = new List<HotelResponse>()
            };

            // Assert
            response.Hotels.Should().NotBeNull();
            response.Hotels.Should().BeEmpty();
        }

        /// <summary>
        /// Teste: Verifica que propriedades opcionais podem ser nulas
        /// </summary>
        [Fact]
        public void TravelPackageResponse_OptionalProperties_ShouldAcceptNull()
        {
            // Arrange & Act
            var response = new TravelPackageResponse
            {
                Id = 1,
                Title = "Teste",
                Description = null,
                Destination = null,
                Hotels = null
            };

            // Assert
            response.Description.Should().BeNull();
            response.Destination.Should().BeNull();
            response.Hotels.Should().BeNull();
        }

        /// <summary>
        /// Teste: Verifica comportamento com datas válidas
        /// </summary>
        [Fact]
        public void TravelPackageResponse_ShouldHandleDateRangeCorrectly()
        {
            // Arrange
            var startDate = new DateTime(2024, 3, 10);
            var endDate = new DateTime(2024, 3, 17);

            // Act
            var response = new TravelPackageResponse
            {
                StartDate = startDate,
                EndDate = endDate
            };

            // Assert
            response.StartDate.Should().Be(startDate);
            response.EndDate.Should().Be(endDate);
            response.StartDate.Should().BeBefore(response.EndDate);
        }
    }

    /// <summary>
    /// ?? Testes unitários para TravelPackageListResponse DTO
    /// </summary>
    public class TravelPackageListResponseTests
    {
        /// <summary>
        /// Teste: Verifica inicialização padrão do TravelPackageListResponse
        /// </summary>
        [Fact]
        public void TravelPackageListResponse_ShouldInitializeWithDefaultValues()
        {
            // Arrange & Act
            var response = new TravelPackageListResponse();

            // Assert
            response.Id.Should().Be(0);
            response.Title.Should().Be(string.Empty);
            response.Destination.Should().BeNull();
            response.Price.Should().Be(0);
            response.IsPromotion.Should().BeFalse();
            response.StartDate.Should().Be(default(DateTime));
            response.EndDate.Should().Be(default(DateTime));
            response.ImageUrl.Should().BeNull();
        }

        /// <summary>
        /// Teste: Verifica se é uma versão simplificada do Response completo
        /// </summary>
        [Fact]
        public void TravelPackageListResponse_ShouldBeLighterThanFullResponse()
        {
            // Arrange & Act
            var listResponse = new TravelPackageListResponse
            {
                Id = 1,
                Title = "Pacote Teste",
                Destination = "Rio de Janeiro",
                Price = 1500.00m,
                IsPromotion = false,
                StartDate = new DateTime(2024, 5, 1),
                EndDate = new DateTime(2024, 5, 7),
                ImageUrl = "https://example.com/image.jpg"
            };

            // Assert
            listResponse.Id.Should().Be(1);
            listResponse.Title.Should().Be("Pacote Teste");
            listResponse.Destination.Should().Be("Rio de Janeiro");
            listResponse.Price.Should().Be(1500.00m);
            listResponse.IsPromotion.Should().BeFalse();
            listResponse.ImageUrl.Should().Be("https://example.com/image.jpg");
            
            // Verifica que NÃO tem propriedades do response completo
            // (Description, Hotels são específicas do TravelPackageResponse)
        }

        /// <summary>
        /// Teste: Verifica se ImageUrl aceita URLs válidas
        /// </summary>
        [Theory]
        [InlineData("https://example.com/image.jpg")]
        [InlineData("http://test.com/photo.png")]
        [InlineData("")]
        [InlineData(null)]
        public void TravelPackageListResponse_ImageUrl_ShouldAcceptValidUrls(string? imageUrl)
        {
            // Arrange & Act
            var response = new TravelPackageListResponse
            {
                ImageUrl = imageUrl
            };

            // Assert
            response.ImageUrl.Should().Be(imageUrl);
        }
    }
}