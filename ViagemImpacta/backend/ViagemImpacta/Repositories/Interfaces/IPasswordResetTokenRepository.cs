using ViagemImpacta.Models;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IPasswordResetTokenRepository
    {
        Task SaveTokenAsync(PasswordResetToken token);
        Task<PasswordResetToken?> GetByTokenAsync(string token);
        Task InvalidateTokenAsync(PasswordResetToken token);
    }
}
