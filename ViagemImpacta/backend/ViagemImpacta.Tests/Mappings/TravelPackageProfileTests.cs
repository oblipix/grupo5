using AutoMapper;
using FluentAssertions;
using ViagemImpacta.Mappings.Profiles;
using ViagemImpacta.Models;
using ViagemImpacta.DTO.TravelPackage;

namespace ViagemImpacta.Tests.Mappings
{
    /// <summary>
    /// ?? Testes unitários para TravelPackageProfile
    /// 
    /// ?? OBJETIVO:
    /// Verificar se os mapeamentos do AutoMapper estão funcionando corretamente
    /// usando Assembly Scanning (como no Program.cs)
    /// </summary>
    public class TravelPackageProfileTests
    {
        private readonly IMapper _mapper;

        public TravelPackageProfileTests()
        {
            // ? USANDO ASSEMBLY SCANNING COMO NO PROGRAM.CS
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddMaps(typeof(TravelPackageProfile).Assembly);
            });
            _mapper = config.CreateMapper();
        }

        /// <summary>
        /// Teste: Verifica se a configuração do AutoMapper é válida
        /// </summary>
        [Fact]
        public void TravelPackageProfile_Configuration_ShouldBeValid()
        {
            // Act & Assert
            _mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }

        /// <summary>
        /// Teste: Verifica mapeamento TravelPackage ? TravelPackageResponse
        /// </summary>
        [Fact]
        public void TravelPackage_ToTravelPackageResponse_ShouldMapCorrectly()
        {
            // Arrange
            var travelPackage = new TravelPackage
            {
                TravelPackageId = 123,
                Title = "Pacote Teste",
                Description = "Descrição teste",
                Destination = "Rio de Janeiro",
                Price = 2500.50m,
                Promotion = true,
                StartDate = new DateTime(2024, 6, 15),
                EndDate = new DateTime(2024, 6, 22),
                Hotels = new List<Hotel>(),
                Reservations = new List<Reservation>(),
                Reviews = new List<Review>()
            };

            // Act
            var response = _mapper.Map<TravelPackageResponse>(travelPackage);

            // Assert
            response.Should().NotBeNull();
            response.Id.Should().Be(123);
            response.Title.Should().Be("Pacote Teste");
            response.Description.Should().Be("Descrição teste");
            response.Destination.Should().Be("Rio de Janeiro");
            response.Price.Should().Be(2500.50m);
            response.IsPromotion.Should().BeTrue();
            response.StartDate.Should().Be(new DateTime(2024, 6, 15));
            response.EndDate.Should().Be(new DateTime(2024, 6, 22));
            response.Hotels.Should().NotBeNull();
        }

        /// <summary>
        /// Teste: Verifica mapeamento TravelPackage ? TravelPackageListResponse
        /// </summary>
        [Fact]
        public void TravelPackage_ToTravelPackageListResponse_ShouldMapCorrectly()
        {
            // Arrange
            var travelPackage = new TravelPackage
            {
                TravelPackageId = 456,
                Title = "Pacote Lista",
                Destination = "São Paulo",
                Price = 1800.00m,
                Promotion = false,
                StartDate = new DateTime(2024, 7, 10),
                EndDate = new DateTime(2024, 7, 15),
                Hotels = new List<Hotel>
                {
                    new Hotel 
                    { 
                        Image = "https://example.com/hotel.jpg",
                        Name = "Hotel Teste",
                        Phone = "123456789",
                        Location = "SP",
                        Rooms = new List<Room>()
                    }
                },
                Reservations = new List<Reservation>(),
                Reviews = new List<Review>()
            };

            // Act
            var response = _mapper.Map<TravelPackageListResponse>(travelPackage);

            // Assert
            response.Should().NotBeNull();
            response.Id.Should().Be(456);
            response.Title.Should().Be("Pacote Lista");
            response.Destination.Should().Be("São Paulo");
            response.Price.Should().Be(1800.00m);
            response.IsPromotion.Should().BeFalse();
            response.ImageUrl.Should().Be("https://example.com/hotel.jpg");
        }

        /// <summary>
        /// Teste: Verifica mapeamento TravelPackageRequest ? TravelPackage
        /// </summary>
        [Fact]
        public void TravelPackageRequest_ToTravelPackage_ShouldMapCorrectly()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Novo Pacote",
                Description = "Nova descrição",
                Destination = "Brasília",
                Price = 3200.75m,
                IsPromotion = true,
                StartDate = new DateTime(2024, 8, 5),
                EndDate = new DateTime(2024, 8, 12),
                HotelIds = new List<int> { 1, 2, 3 }
            };

            // Act
            var entity = _mapper.Map<TravelPackage>(request);

            // Assert
            entity.Should().NotBeNull();
            entity.TravelPackageId.Should().Be(0); // Ignorado
            entity.Title.Should().Be("Novo Pacote");
            entity.Description.Should().Be("Nova descrição");
            entity.Destination.Should().Be("Brasília");
            entity.Price.Should().Be(3200.75m);
            entity.Promotion.Should().BeTrue(); // Mapeado de IsPromotion
            entity.Active.Should().BeTrue(); // Padrão
            entity.CreatedAt.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMinutes(1));
            entity.UpdatedAt.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMinutes(1));
        }

        /// <summary>
        /// Teste: Verifica se ImageUrl mapeia corretamente quando não há hotéis
        /// </summary>
        [Fact]
        public void TravelPackage_ToTravelPackageListResponse_WithoutHotels_ShouldReturnEmptyImageUrl()
        {
            // Arrange
            var travelPackage = new TravelPackage
            {
                TravelPackageId = 789,
                Title = "Pacote Sem Hotel",
                Hotels = new List<Hotel>(), // Lista vazia em vez de null
                Reservations = new List<Reservation>(),
                Reviews = new List<Review>()
            };

            // Act
            var response = _mapper.Map<TravelPackageListResponse>(travelPackage);

            // Assert
            response.ImageUrl.Should().Be(string.Empty);
        }
    }
}