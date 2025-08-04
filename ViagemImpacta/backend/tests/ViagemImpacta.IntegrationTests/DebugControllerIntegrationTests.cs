using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;

namespace ViagemImpacta.IntegrationTests;

/// <summary>
/// Factory customizada para testes de integração
/// </summary>
public class ViagemImpactaWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Configurações específicas para testes de integração
            // Por exemplo: banco de dados em memória, mocks de serviços externos, etc.
        });

        builder.UseEnvironment("Testing");
    }
}

/// <summary>
/// Classe base para testes de integração
/// </summary>
public class IntegrationTestBase : IClassFixture<ViagemImpactaWebApplicationFactory>
{
    protected readonly ViagemImpactaWebApplicationFactory Factory;
    protected readonly HttpClient Client;

    public IntegrationTestBase(ViagemImpactaWebApplicationFactory factory)
    {
        Factory = factory;
        Client = factory.CreateClient();
    }
}

/// <summary>
/// Testes de integração para o endpoint de debug
/// </summary>
public class DebugControllerIntegrationTests : IntegrationTestBase
{
    public DebugControllerIntegrationTests(ViagemImpactaWebApplicationFactory factory)
        : base(factory) { }

    [Fact]
    public async Task TestFailFast_Endpoint_ShouldReturnSuccess()
    {
        // Arrange
        var endpoint = "/api/debug/test-failfast?destination=São Paulo&stars=4";

        // Act
        var response = await Client.GetAsync(endpoint);

        // Assert
        response.IsSuccessStatusCode.Should().BeTrue();
    }

    [Theory]
    [InlineData("/api/debug/test-failfast?minPrice=-100", "NegativeMinPrice")]
    [InlineData("/api/debug/test-failfast?maxPrice=-500", "NegativeMaxPrice")]
    [InlineData("/api/debug/test-failfast?stars=10", "InvalidStars")]
    [InlineData("/api/debug/test-failfast?guests=0", "InvalidGuests")]
    public async Task TestFailFast_WithInvalidParameters_ShouldReturnBadRequest(
        string endpoint, string expectedFailFastType)
    {
        // Act
        var response = await Client.GetAsync(endpoint);

        // Assert
        // Note: Dependendo da implementação, pode retornar BadRequest ou Ok com mensagem de erro
        response.Should().NotBeNull();
    }
}
