using FluentAssertions;
using System.ComponentModel.DataAnnotations;
using ViagemImpacta.DTO.TravelPackage;

namespace ViagemImpacta.Tests.DTOs.Validation
{
    /// <summary>
    /// ?? Testes unitários para validações de Data Annotations nos DTOs
    /// 
    /// ?? IMPORTANTE:
    /// Estes testes verificam se as Data Annotations estão funcionando corretamente.
    /// Isso é crucial para validação de entrada nas APIs.
    /// </summary>
    public class TravelPackageRequestValidationTests
    {
        /// <summary>
        /// Helper method para executar validações
        /// </summary>
        private static IList<ValidationResult> ValidateModel(object model)
        {
            var validationResults = new List<ValidationResult>();
            var ctx = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, ctx, validationResults, true);
            return validationResults;
        }

        /// <summary>
        /// Teste: Verifica se um modelo válido passa na validação
        /// </summary>
        [Fact]
        public void TravelPackageRequest_ValidModel_ShouldPassValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Válido",
                Description = "Uma descrição válida",
                Destination = "Rio de Janeiro",
                Price = 1500.00m,
                IsPromotion = false,
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().BeEmpty();
        }

        /// <summary>
        /// Teste: Verifica validação Required para Title
        /// </summary>
        [Fact]
        public void TravelPackageRequest_EmptyTitle_ShouldFailValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "", // ? Inválido
                Destination = "Rio de Janeiro",
                Price = 1500.00m,
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("Título é obrigatório"));
        }

        /// <summary>
        /// Teste: Verifica validação StringLength para Title
        /// </summary>
        [Fact]
        public void TravelPackageRequest_TitleTooLong_ShouldFailValidation()
        {
            // Arrange
            var longTitle = new string('A', 201); // 201 caracteres (limite é 200)
            var request = new TravelPackageRequest
            {
                Title = longTitle, // ? Inválido
                Destination = "Rio de Janeiro",
                Price = 1500.00m,
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("200 caracteres"));
        }

        /// <summary>
        /// Teste: Verifica validação Required para Destination
        /// </summary>
        [Fact]
        public void TravelPackageRequest_EmptyDestination_ShouldFailValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "", // ? Inválido
                Price = 1500.00m,
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("Destino é obrigatório"));
        }

        /// <summary>
        /// Teste: Verifica validação Range para Price
        /// </summary>
        [Theory]
        [InlineData(0)]      // ? Zero não é válido
        [InlineData(-1)]     // ? Negativo não é válido
        [InlineData(-100)]   // ? Negativo não é válido
        public void TravelPackageRequest_InvalidPrice_ShouldFailValidation(decimal invalidPrice)
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = invalidPrice, // ? Inválido
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("maior que zero"));
        }

        /// <summary>
        /// Teste: Verifica validação Range para Price com valores válidos
        /// </summary>
        [Theory]
        [InlineData(0.01)]   // ? Mínimo válido
        [InlineData(1)]      // ? Válido
        [InlineData(1000)]   // ? Válido
        [InlineData(99999)]  // ? Válido
        public void TravelPackageRequest_ValidPrice_ShouldPassValidation(decimal validPrice)
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = validPrice, // ? Válido
                StartDate = DateTime.Now.AddDays(30),
                EndDate = DateTime.Now.AddDays(37)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            // Não deve ter erros relacionados ao preço
            validationResults.Should().NotContain(v => v.ErrorMessage!.Contains("maior que zero"));
        }

        /// <summary>
        /// Teste: Verifica validação FutureDate para StartDate
        /// </summary>
        [Fact]
        public void TravelPackageRequest_PastStartDate_ShouldFailValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = 1000,
                StartDate = DateTime.Now.AddDays(-1), // ? Data no passado
                EndDate = DateTime.Now.AddDays(5)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("deve ser futura"));
        }

        /// <summary>
        /// Teste: Verifica validação DateGreaterThan para EndDate
        /// </summary>
        [Fact]
        public void TravelPackageRequest_EndDateBeforeStartDate_ShouldFailValidation()
        {
            // Arrange
            var startDate = DateTime.Now.AddDays(10);
            var endDate = DateTime.Now.AddDays(5); // ? Anterior ao StartDate

            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = 1000,
                StartDate = startDate,
                EndDate = endDate // ? Inválido
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("posterior à data de início"));
        }

        /// <summary>
        /// Teste: Verifica validação StringLength para Description
        /// </summary>
        [Fact]
        public void TravelPackageRequest_DescriptionTooLong_ShouldFailValidation()
        {
            // Arrange
            var longDescription = new string('X', 1001); // 1001 caracteres (limite é 1000)
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = 1000,
                Description = longDescription, // ? Inválido
                StartDate = DateTime.Now.AddDays(10),
                EndDate = DateTime.Now.AddDays(15)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Should().Contain(v => v.ErrorMessage!.Contains("1000 caracteres"));
        }

        /// <summary>
        /// Teste: Verifica que Description pode ser nula
        /// </summary>
        [Fact]
        public void TravelPackageRequest_NullDescription_ShouldPassValidation()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "Pacote Teste",
                Destination = "Teste",
                Price = 1000,
                Description = null, // ? Permitido
                StartDate = DateTime.Now.AddDays(10),
                EndDate = DateTime.Now.AddDays(15)
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotContain(v => v.ErrorMessage!.Contains("Descrição"));
        }

        /// <summary>
        /// Teste: Verifica múltiplos erros de validação
        /// </summary>
        [Fact]
        public void TravelPackageRequest_MultipleErrors_ShouldReturnAllErrors()
        {
            // Arrange
            var request = new TravelPackageRequest
            {
                Title = "", // ? Vazio
                Destination = "", // ? Vazio
                Price = 0, // ? Zero
                StartDate = DateTime.Now.AddDays(-1), // ? Passado
                EndDate = DateTime.Now.AddDays(-2) // ? Anterior ao start
            };

            // Act
            var validationResults = ValidateModel(request);

            // Assert
            validationResults.Should().NotBeEmpty();
            validationResults.Count.Should().BeGreaterThanOrEqualTo(4); // Corrigido
        }
    }
}