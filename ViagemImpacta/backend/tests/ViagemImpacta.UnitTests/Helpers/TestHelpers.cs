using ViagemImpacta.Models;

namespace ViagemImpacta.UnitTests.Helpers;

/// <summary>
/// Builder para criar objetos Hotel para testes
/// </summary>
public class HotelBuilder
{
    private Hotel _hotel = new();

    public static HotelBuilder Create() => new();

    public HotelBuilder WithId(int id)
    {
        _hotel.HotelId = id;
        return this;
    }

    public HotelBuilder WithName(string name)
    {
        _hotel.Name = name;
        return this;
    }

    public HotelBuilder WithAddress(string address)
    {
        _hotel.HotelAddress = address;
        return this;
    }

    public HotelBuilder WithPhone(string phone)
    {
        _hotel.Phone = phone;
        return this;
    }

    public HotelBuilder WithStars(int stars)
    {
        _hotel.Stars = stars;
        return this;
    }

    public HotelBuilder WithRating(decimal rating)
    {
        _hotel.Rating = rating;
        return this;
    }

    public Hotel Build() => _hotel;

    public List<Hotel> BuildList(int count = 1)
    {
        var hotels = new List<Hotel>();
        for (int i = 0; i < count; i++)
        {
            hotels.Add(Build());
        }
        return hotels;
    }
}

/// <summary>
/// Dados de teste comuns
/// </summary>
public static class TestData
{
    public static class Destinations
    {
        public const string SaoPaulo = "São Paulo";
        public const string RioDeJaneiro = "Rio de Janeiro";
        public const string Brasilia = "Brasília";
        public const string Salvador = "Salvador";
    }

    public static class Prices
    {
        public const decimal MinBudget = 50m;
        public const decimal MaxBudget = 200m;
        public const decimal MinLuxury = 500m;
        public const decimal MaxLuxury = 2000m;
    }

    public static class DateRanges
    {
        public static readonly string CheckInFuture = DateTime.Now.AddDays(30).ToString("yyyy-MM-dd");
        public static readonly string CheckOutFuture = DateTime.Now.AddDays(35).ToString("yyyy-MM-dd");
        public static readonly string CheckInPast = DateTime.Now.AddDays(-30).ToString("yyyy-MM-dd");
        public static readonly string CheckOutPast = DateTime.Now.AddDays(-25).ToString("yyyy-MM-dd");
    }
}

/// <summary>
/// Extensões para testes
/// </summary>
public static class TestExtensions
{
    public static T ShouldBeOfType<T>(this object obj) where T : class
    {
        obj.Should().BeOfType<T>();
        return (T)obj;
    }
}
