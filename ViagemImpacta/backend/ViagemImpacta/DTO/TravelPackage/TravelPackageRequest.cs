using System.ComponentModel.DataAnnotations;

namespace ViagemImpacta.DTO.TravelPackage
{
    /// <summary>
    /// ?? Request para criar um novo pacote de viagem
    /// Usado em: POST /api/travelpackages
    /// </summary>
    public class TravelPackageRequest
    {
        [Required(ErrorMessage = "Título é obrigatório")]
        [StringLength(200, ErrorMessage = "Título deve ter no máximo 200 caracteres")]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000, ErrorMessage = "Descrição deve ter no máximo 1000 caracteres")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Destino é obrigatório")]
        [StringLength(100, ErrorMessage = "Destino deve ter no máximo 100 caracteres")]
        public string Destination { get; set; } = string.Empty;

        [Required(ErrorMessage = "Preço é obrigatório")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Preço deve ser maior que zero")]
        public decimal Price { get; set; }

        public bool IsPromotion { get; set; }

        [Required(ErrorMessage = "Data de início é obrigatória")]
        [FutureDate(ErrorMessage = "Data de início deve ser futura")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Data de fim é obrigatória")]
        [DateGreaterThan("StartDate", ErrorMessage = "Data de fim deve ser posterior à data de início")]
        public DateTime EndDate { get; set; }

        public List<int>? HotelIds { get; set; }
    }

    // ?? Custom Validation Attributes

    public class FutureDateAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value is DateTime date)
            {
                return date > DateTime.Now;
            }
            return false;
        }
    }

    public class DateGreaterThanAttribute : ValidationAttribute
    {
        private readonly string _comparisonProperty;

        public DateGreaterThanAttribute(string comparisonProperty)
        {
            _comparisonProperty = comparisonProperty;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var currentValue = (DateTime?)value;
            var property = validationContext.ObjectType.GetProperty(_comparisonProperty);

            if (property == null)
                throw new ArgumentException("Property with this name not found");

            var comparisonValue = (DateTime?)property.GetValue(validationContext.ObjectInstance);

            if (currentValue <= comparisonValue)
            {
                return new ValidationResult(ErrorMessage ?? "Date must be greater than comparison date");
            }

            return ValidationResult.Success;
        }
    }
}