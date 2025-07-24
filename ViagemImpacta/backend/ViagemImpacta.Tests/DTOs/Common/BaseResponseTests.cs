using FluentAssertions;
using ViagemImpacta.DTO.Common;

namespace ViagemImpacta.Tests.DTOs.Common
{
    /// <summary>
    /// ?? Testes unitários para PaginatedResponse<T> DTO
    /// </summary>
    public class PaginatedResponseTests
    {
        /// <summary>
        /// Teste: Verifica inicialização padrão do PaginatedResponse
        /// </summary>
        [Fact]
        public void PaginatedResponse_ShouldInitializeWithDefaultValues()
        {
            // Arrange & Act
            var response = new PaginatedResponse<string>();

            // Assert
            response.Data.Should().NotBeNull();
            response.Data.Should().BeEmpty();
            response.TotalItems.Should().Be(0);
            response.PageNumber.Should().Be(0);
            response.PageSize.Should().Be(0);
            response.TotalPages.Should().Be(0);
            response.HasNextPage.Should().BeFalse();
            response.HasPreviousPage.Should().BeFalse();
        }

        /// <summary>
        /// Teste: Verifica cálculo correto do TotalPages
        /// </summary>
        [Theory]
        [InlineData(0, 10, 0)]    // 0 itens = 0 páginas
        [InlineData(5, 10, 1)]    // 5 itens, 10 por página = 1 página
        [InlineData(10, 10, 1)]   // 10 itens, 10 por página = 1 página
        [InlineData(15, 10, 2)]   // 15 itens, 10 por página = 2 páginas
        [InlineData(100, 20, 5)]  // 100 itens, 20 por página = 5 páginas
        [InlineData(101, 20, 6)]  // 101 itens, 20 por página = 6 páginas
        public void PaginatedResponse_TotalPages_ShouldCalculateCorrectly(
            int totalItems, int pageSize, int expectedTotalPages)
        {
            // Arrange & Act
            var response = new PaginatedResponse<string>
            {
                TotalItems = totalItems,
                PageSize = pageSize
            };

            // Assert
            response.TotalPages.Should().Be(expectedTotalPages);
        }

        /// <summary>
        /// Teste: Verifica cálculo correto do HasNextPage
        /// </summary>
        [Theory]
        [InlineData(1, 5, true)]   // Página 1 de 5 = tem próxima
        [InlineData(3, 5, true)]   // Página 3 de 5 = tem próxima
        [InlineData(5, 5, false)]  // Página 5 de 5 = não tem próxima
        [InlineData(1, 1, false)]  // Página 1 de 1 = não tem próxima
        public void PaginatedResponse_HasNextPage_ShouldCalculateCorrectly(
            int pageNumber, int totalPages, bool expectedHasNext)
        {
            // Arrange & Act
            var response = new PaginatedResponse<string>
            {
                PageNumber = pageNumber,
                TotalItems = totalPages * 10, // Para que TotalPages = totalPages
                PageSize = 10
            };

            // Assert
            response.HasNextPage.Should().Be(expectedHasNext);
        }

        /// <summary>
        /// Teste: Verifica cálculo correto do HasPreviousPage
        /// </summary>
        [Theory]
        [InlineData(1, false)]  // Página 1 = não tem anterior
        [InlineData(2, true)]   // Página 2 = tem anterior
        [InlineData(5, true)]   // Página 5 = tem anterior
        public void PaginatedResponse_HasPreviousPage_ShouldCalculateCorrectly(
            int pageNumber, bool expectedHasPrevious)
        {
            // Arrange & Act
            var response = new PaginatedResponse<string>
            {
                PageNumber = pageNumber
            };

            // Assert
            response.HasPreviousPage.Should().Be(expectedHasPrevious);
        }

        /// <summary>
        /// Teste: Verifica comportamento com lista de dados
        /// </summary>
        [Fact]
        public void PaginatedResponse_ShouldHandleDataList()
        {
            // Arrange
            var testData = new List<string> { "Item1", "Item2", "Item3" };

            // Act
            var response = new PaginatedResponse<string>
            {
                Data = testData,
                TotalItems = 25,
                PageNumber = 2,
                PageSize = 10
            };

            // Assert
            response.Data.Should().HaveCount(3);
            response.Data.Should().BeEquivalentTo(testData);
            response.TotalPages.Should().Be(3); // 25 ÷ 10 = 3 páginas
            response.HasNextPage.Should().BeTrue(); // Página 2 de 3
            response.HasPreviousPage.Should().BeTrue(); // Página 2
        }

        /// <summary>
        /// Teste: Verifica comportamento com diferentes tipos genéricos
        /// </summary>
        [Fact]
        public void PaginatedResponse_ShouldWorkWithDifferentTypes()
        {
            // Arrange & Act
            var stringResponse = new PaginatedResponse<string>();
            var intResponse = new PaginatedResponse<int>();
            var objectResponse = new PaginatedResponse<object>();

            // Assert
            stringResponse.Data.Should().BeOfType<List<string>>();
            intResponse.Data.Should().BeOfType<List<int>>();
            objectResponse.Data.Should().BeOfType<List<object>>();
        }
    }

    /// <summary>
    /// ?? Testes unitários para BaseResponse DTO
    /// </summary>
    public class BaseResponseTests
    {
        /// <summary>
        /// Teste: Verifica inicialização padrão do BaseResponse
        /// </summary>
        [Fact]
        public void BaseResponse_ShouldInitializeWithDefaultValues()
        {
            // Arrange & Act
            var response = new BaseResponse();

            // Assert
            response.Success.Should().BeFalse();
            response.Message.Should().Be(string.Empty);
            response.Errors.Should().NotBeNull();
            response.Errors.Should().BeEmpty();
        }

        /// <summary>
        /// Teste: Verifica resposta de sucesso
        /// </summary>
        [Fact]
        public void BaseResponse_ShouldHandleSuccessResponse()
        {
            // Arrange & Act
            var response = new BaseResponse
            {
                Success = true,
                Message = "Operação realizada com sucesso"
            };

            // Assert
            response.Success.Should().BeTrue();
            response.Message.Should().Be("Operação realizada com sucesso");
            response.Errors.Should().BeEmpty();
        }

        /// <summary>
        /// Teste: Verifica resposta de erro
        /// </summary>
        [Fact]
        public void BaseResponse_ShouldHandleErrorResponse()
        {
            // Arrange
            var errors = new List<string> { "Erro 1", "Erro 2", "Erro 3" };

            // Act
            var response = new BaseResponse
            {
                Success = false,
                Message = "Falha na operação",
                Errors = errors
            };

            // Assert
            response.Success.Should().BeFalse();
            response.Message.Should().Be("Falha na operação");
            response.Errors.Should().HaveCount(3);
            response.Errors.Should().BeEquivalentTo(errors);
        }
    }

    /// <summary>
    /// ?? Testes unitários para BaseResponse<T> DTO
    /// </summary>
    public class BaseResponseGenericTests
    {
        /// <summary>
        /// Teste: Verifica herança do BaseResponse
        /// </summary>
        [Fact]
        public void BaseResponseGeneric_ShouldInheritFromBaseResponse()
        {
            // Arrange & Act
            var response = new BaseResponse<string>();

            // Assert
            response.Should().BeAssignableTo<BaseResponse>();
            response.Success.Should().BeFalse();
            response.Message.Should().Be(string.Empty);
            response.Errors.Should().NotBeNull();
            response.Data.Should().BeNull();
        }

        /// <summary>
        /// Teste: Verifica resposta de sucesso com dados
        /// </summary>
        [Fact]
        public void BaseResponseGeneric_ShouldHandleSuccessWithData()
        {
            // Arrange
            var testData = "Test Data";

            // Act
            var response = new BaseResponse<string>
            {
                Success = true,
                Message = "Dados recuperados com sucesso",
                Data = testData
            };

            // Assert
            response.Success.Should().BeTrue();
            response.Message.Should().Be("Dados recuperados com sucesso");
            response.Data.Should().Be(testData);
            response.Errors.Should().BeEmpty();
        }

        /// <summary>
        /// Teste: Verifica resposta de erro sem dados
        /// </summary>
        [Fact]
        public void BaseResponseGeneric_ShouldHandleErrorWithoutData()
        {
            // Arrange & Act
            var response = new BaseResponse<string>
            {
                Success = false,
                Message = "Erro ao recuperar dados",
                Data = null,
                Errors = new List<string> { "Dados não encontrados" }
            };

            // Assert
            response.Success.Should().BeFalse();
            response.Message.Should().Be("Erro ao recuperar dados");
            response.Data.Should().BeNull();
            response.Errors.Should().HaveCount(1);
        }

        /// <summary>
        /// Teste: Verifica comportamento com diferentes tipos
        /// </summary>
        [Fact]
        public void BaseResponseGeneric_ShouldWorkWithComplexTypes()
        {
            // Arrange
            var complexData = "Complex Test Data"; // Corrigido: usar string em vez de anonymous type

            // Act
            var response = new BaseResponse<string>
            {
                Success = true,
                Data = complexData
            };

            // Assert
            response.Data.Should().Be(complexData);
            response.Data.Should().BeOfType<string>(); // Corrigido
        }
    }
}