using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Interfaces;

namespace ViagemImpacta.Repositories.Implementations
{
    public class PasswordResetTokenRepository : IPasswordResetTokenRepository
    {
        private readonly AgenciaDbContext _context;
        public PasswordResetTokenRepository(AgenciaDbContext context)
        {
            _context = context;
        }

        public async Task SaveTokenAsync(PasswordResetToken token)
        {
            _context.PasswordResetTokens.Add(token);
            await _context.SaveChangesAsync();
        }

        public async Task<PasswordResetToken?> GetByTokenAsync(string token)
        {
            return await _context.PasswordResetTokens
                .FirstOrDefaultAsync(t => t.Token == token && !t.Used && t.Expiration > DateTime.UtcNow);
        }

        public async Task InvalidateTokenAsync(PasswordResetToken token)
        {
            token.Used = true;
            _context.PasswordResetTokens.Update(token);
            await _context.SaveChangesAsync();
        }

    }
}
