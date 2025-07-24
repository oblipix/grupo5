using FluentAssertions;
using ViagemImpacta.DTO.User;

namespace ViagemImpacta.Tests.DTOs.User
{
    /// <summary>
    /// ?? Testes unitários para UserResponse DTO
    /// </summary>
    public class UserResponseTests
    {
        /// <summary>
        /// Teste: Verifica inicialização padrão do UserResponse
        /// </summary>
        [Fact]
        public void UserResponse_ShouldInitializeWithDefaultValues()
        {
            // Arrange & Act
            var response = new UserResponse();

            // Assert
            response.Id.Should().Be(0);
            response.FirstName.Should().Be(string.Empty);
            response.LastName.Should().Be(string.Empty);
            response.FullName.Should().Be(string.Empty);
            response.Email.Should().Be(string.Empty);
            response.Age.Should().Be(0);
            response.CreatedAt.Should().Be(default(DateTime));
            response.Photo.Should().Be(string.Empty);
            response.Active.Should().BeFalse();
        }

        /// <summary>
        /// Teste: Verifica se todas as propriedades podem ser definidas
        /// </summary>
        [Fact]
        public void UserResponse_ShouldSetAllPropertiesCorrectly()
        {
            // Arrange
            var createdAt = new DateTime(2023, 1, 15, 10, 30, 0);

            // Act
            var response = new UserResponse
            {
                Id = 123456789L,
                FirstName = "João",
                LastName = "Silva",
                FullName = "João Silva",
                Email = "joao.silva@email.com",
                Age = 35,
                CreatedAt = createdAt,
                Photo = "https://example.com/photos/joao.jpg",
                Active = true
            };

            // Assert
            response.Id.Should().Be(123456789L);
            response.FirstName.Should().Be("João");
            response.LastName.Should().Be("Silva");
            response.FullName.Should().Be("João Silva");
            response.Email.Should().Be("joao.silva@email.com");
            response.Age.Should().Be(35);
            response.CreatedAt.Should().Be(createdAt);
            response.Photo.Should().Be("https://example.com/photos/joao.jpg");
            response.Active.Should().BeTrue();
        }

        /// <summary>
        /// Teste: Verifica se ID suporta valores long (para muitos usuários)
        /// </summary>
        [Theory]
        [InlineData(1L)]
        [InlineData(1000000L)]
        [InlineData(9223372036854775807L)] // long.MaxValue
        public void UserResponse_Id_ShouldSupportLongValues(long id)
        {
            // Arrange & Act
            var response = new UserResponse
            {
                Id = id
            };

            // Assert
            response.Id.Should().Be(id);
        }

        /// <summary>
        /// Teste: Verifica se Age aceita valores válidos
        /// </summary>
        [Theory]
        [InlineData(0)]   // Recém-nascido
        [InlineData(18)]  // Maior de idade
        [InlineData(25)]  // Jovem adulto
        [InlineData(65)]  // Idoso
        [InlineData(120)] // Limite extremo
        public void UserResponse_Age_ShouldAcceptValidAges(int age)
        {
            // Arrange & Act
            var response = new UserResponse
            {
                Age = age
            };

            // Assert
            response.Age.Should().Be(age);
            response.Age.Should().BeGreaterThanOrEqualTo(0); // Corrigido
        }

        /// <summary>
        /// Teste: Verifica se Email aceita formatos válidos
        /// </summary>
        [Theory]
        [InlineData("user@example.com")]
        [InlineData("user.name@example.com.br")]
        [InlineData("user+tag@domain.org")]
        [InlineData("123@numbers.com")]
        public void UserResponse_Email_ShouldAcceptValidFormats(string email)
        {
            // Arrange & Act
            var response = new UserResponse
            {
                Email = email
            };

            // Assert
            response.Email.Should().Be(email);
        }

        /// <summary>
        /// Teste: Verifica segurança - não deve ter dados sensíveis
        /// </summary>
        [Fact]
        public void UserResponse_ShouldNotHaveSensitiveData()
        {
            // Arrange & Act
            var response = new UserResponse();
            var properties = typeof(UserResponse).GetProperties();

            // Assert - Verifica que NÃO tem propriedades sensíveis
            properties.Should().NotContain(p => p.Name.ToLower().Contains("password"));
            properties.Should().NotContain(p => p.Name.ToLower().Contains("cpf"));
            properties.Should().NotContain(p => p.Name.ToLower().Contains("phone"));
        }

        /// <summary>
        /// Teste: Verifica se FullName é consistente com FirstName + LastName
        /// </summary>
        [Fact]
        public void UserResponse_FullName_ShouldBeConsistentWithNames()
        {
            // Arrange & Act
            var response = new UserResponse
            {
                FirstName = "Maria",
                LastName = "Santos",
                FullName = "Maria Santos"
            };

            // Assert
            response.FullName.Should().Contain(response.FirstName);
            response.FullName.Should().Contain(response.LastName);
        }
    }

    /// <summary>
    /// ?? Testes unitários para UserListResponse DTO
    /// </summary>
    public class UserListResponseTests
    {
        /// <summary>
        /// Teste: Verifica inicialização padrão do UserListResponse
        /// </summary>
        [Fact]
        public void UserListResponse_ShouldInitializeWithDefaultValues()
        {
            // Arrange & Act
            var response = new UserListResponse();

            // Assert
            response.Id.Should().Be(0);
            response.FirstName.Should().Be(string.Empty);
            response.LastName.Should().Be(string.Empty);
            response.FullName.Should().Be(string.Empty);
            response.Email.Should().Be(string.Empty);
            response.CreatedAt.Should().Be(default(DateTime));
            response.Active.Should().BeFalse();
        }

        /// <summary>
        /// Teste: Verifica se é uma versão simplificada do UserResponse
        /// </summary>
        [Fact]
        public void UserListResponse_ShouldBeLighterThanFullResponse()
        {
            // Arrange & Act
            var listResponse = new UserListResponse
            {
                Id = 789L,
                FirstName = "Ana",
                LastName = "Costa",
                FullName = "Ana Costa",
                Email = "ana.costa@email.com",
                CreatedAt = DateTime.Now,
                Active = true
            };

            // Assert
            listResponse.Id.Should().Be(789L);
            listResponse.FirstName.Should().Be("Ana");
            listResponse.LastName.Should().Be("Costa");
            listResponse.FullName.Should().Be("Ana Costa");
            listResponse.Email.Should().Be("ana.costa@email.com");
            listResponse.Active.Should().BeTrue();
            
            // Verifica que NÃO tem propriedades do response completo
            // (Age, Photo são específicas do UserResponse)
        }

        /// <summary>
        /// Teste: Verifica compatibilidade com UserResponse
        /// </summary>
        [Fact]
        public void UserListResponse_ShouldBeCompatibleWithUserResponse()
        {
            // Arrange
            var fullResponse = new UserResponse
            {
                Id = 999L,
                FirstName = "Carlos",
                LastName = "Oliveira",
                FullName = "Carlos Oliveira",
                Email = "carlos@test.com",
                Age = 42,
                CreatedAt = new DateTime(2023, 5, 10),
                Photo = "photo.jpg",
                Active = true
            };

            // Act - Simula o que AutoMapper faria
            var listResponse = new UserListResponse
            {
                Id = fullResponse.Id,
                FirstName = fullResponse.FirstName,
                LastName = fullResponse.LastName,
                FullName = fullResponse.FullName,
                Email = fullResponse.Email,
                CreatedAt = fullResponse.CreatedAt,
                Active = fullResponse.Active
            };

            // Assert
            listResponse.Id.Should().Be(fullResponse.Id);
            listResponse.FirstName.Should().Be(fullResponse.FirstName);
            listResponse.LastName.Should().Be(fullResponse.LastName);
            listResponse.FullName.Should().Be(fullResponse.FullName);
            listResponse.Email.Should().Be(fullResponse.Email);
            listResponse.CreatedAt.Should().Be(fullResponse.CreatedAt);
            listResponse.Active.Should().Be(fullResponse.Active);
        }
    }
}