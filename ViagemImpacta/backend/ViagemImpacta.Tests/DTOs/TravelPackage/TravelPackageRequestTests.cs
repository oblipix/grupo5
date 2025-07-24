using FluentAssertions;
using ViagemImpacta.DTO.TravelPackage;

namespace ViagemImpacta.Tests.DTOs.TravelPackage
{
    /// <summary>
    /// ?? Testes unitários para TravelPackageRequest DTO
    /// 
    /// ?? O QUE TESTAMOS NOS DTOs:
    /// - Inicialização de propriedades
    /// - Validações de Data Annotations
    /// - Valores padrão
    /// - Comportamento de propriedades
    /// - Serialização/Deserialização (se necessário)
    /// </summary>
    public class TravelPackageRequestTests
    {
        /// <summary>
        /// Teste: Verifica se o DTO é criado com valores padrão corretos
        /// </summary>
        [Fact]
        public void TravelPackageRequest_ShouldInitializeWithDefaultValues()
        {
            // Arrange & Act
            var request = new TravelPackageRequest();

            // Assert
            request.Title.Should().Be(string.Empty);
            request.Description.Should().BeNull();
            request.Destination.Should().Be(string.Empty);
            request.Price.Should().Be(0);
            request.IsPromotion.Should().BeFalse();
            request.StartDate.Should().Be(default(DateTime));
            request.EndDate.Should().Be(default(DateTime));
            request.HotelIds.Should().BeNull();
        }

        /// <summary>
        /// Teste: Verifica se todas as propriedades podem ser definidas corretamente
        /// </summary>
        [Fact]
        public void TravelPackageRequest_ShouldSetAllPropertiesCorrectly()
        {
            // Arrange
            var expectedTitle = "Pacote Rio de Janeiro";
            var expectedDescription = "Viagem incrível para o Rio";
            var expectedDestination = "Rio de Janeiro";
            var expectedPrice = 2500.00m;
            var expectedIsPromotion = true;
            var expectedStartDate = new DateTime(2024, 12, 15);
            var expectedEndDate = new DateTime(2024, 12, 20);
            var expectedHotelIds = new List<int> { 1, 2, 3 };

            // Act
            var request = new TravelPackageRequest
            {
                Title = expectedTitle,
                Description = expectedDescription,
                Destination = expectedDestination,
                Price = expectedPrice,
                IsPromotion = expectedIsPromotion,
                StartDate = expectedStartDate,
                EndDate = expectedEndDate,
                HotelIds = expectedHotelIds
            };

            // Assert
            request.Title.Should().Be(expectedTitle);
            request.Description.Should().Be(expectedDescription);
            request.Destination.Should().Be(expectedDestination);
            request.Price.Should().Be(expectedPrice);
            request.IsPromotion.Should().Be(expectedIsPromotion);
            request.StartDate.Should().Be(expectedStartDate);
            request.EndDate.Should().Be(expectedEndDate);
            request.HotelIds.Should().BeEquivalentTo(expectedHotelIds);
        }

        /// <summary>
        /// Teste: Verifica se HotelIds pode ser nulo sem problemas
        /// </summary>
        [Fact]
        public void TravelPackageRequest_HotelIds_ShouldAcceptNull()
        {
            // Arrange & Act
            var request = new TravelPackageRequest
            {
                Title = "Teste",
                Destination = "Teste",
                Price = 100,
                StartDate = DateTime.Now.AddDays(1),
                EndDate = DateTime.Now.AddDays(5),
                HotelIds = null
            };

            // Assert
            request.HotelIds.Should().BeNull();
        }

        /// <summary>
        /// Teste: Verifica se HotelIds pode ser uma lista vazia
        /// </summary>
        [Fact]
        public void TravelPackageRequest_HotelIds_ShouldAcceptEmptyList()
        {
            // Arrange & Act
            var request = new TravelPackageRequest
            {
                Title = "Teste",
                Destination = "Teste",
                Price = 100,
                StartDate = DateTime.Now.AddDays(1),
                EndDate = DateTime.Now.AddDays(5),
                HotelIds = new List<int>()
            };

            // Assert
            request.HotelIds.Should().NotBeNull();
            request.HotelIds.Should().BeEmpty();
        }

        /// <summary>
        /// Teste: Verifica se o preço aceita valores decimais precisos
        /// </summary>
        [Theory]
        [InlineData(0.01)]
        [InlineData(999.99)]
        [InlineData(1234.56)]
        [InlineData(10000.00)]
        public void TravelPackageRequest_Price_ShouldAcceptValidDecimalValues(decimal price)
        {
            // Arrange & Act
            var request = new TravelPackageRequest
            {
                Price = price
            };

            // Assert
            request.Price.Should().Be(price);
        }

        /// <summary>
        /// Teste: Verifica se as datas são armazenadas corretamente
        /// </summary>
        [Fact]
        public void TravelPackageRequest_Dates_ShouldStoreCorrectly()
        {
            // Arrange
            var startDate = new DateTime(2024, 6, 15, 10, 30, 45);
            var endDate = new DateTime(2024, 6, 20, 14, 15, 30);

            // Act
            var request = new TravelPackageRequest
            {
                StartDate = startDate,
                EndDate = endDate
            };

            // Assert
            request.StartDate.Should().Be(startDate);
            request.EndDate.Should().Be(endDate);
            request.StartDate.Should().BeBefore(request.EndDate);
        }

        /// <summary>
        /// Teste: Verifica se Description aceita strings longas
        /// </summary>
        [Fact]
        public void TravelPackageRequest_Description_ShouldAcceptLongStrings()
        {
            // Arrange
            var longDescription = new string('A', 1000); // String com 1000 caracteres

            // Act
            var request = new TravelPackageRequest
            {
                Description = longDescription
            };

            // Assert
            request.Description.Should().Be(longDescription);
            request.Description.Should().HaveLength(1000);
        }

        /// <summary>
        /// Teste: Verifica se strings vazias são tratadas corretamente
        /// </summary>
        [Fact]
        public void TravelPackageRequest_StringProperties_ShouldHandleEmptyStrings()
        {
            // Arrange & Act
            var request = new TravelPackageRequest
            {
                Title = "",
                Description = "",
                Destination = ""
            };

            // Assert
            request.Title.Should().Be(string.Empty);
            request.Description.Should().Be(string.Empty);
            request.Destination.Should().Be(string.Empty);
        }
    }
}