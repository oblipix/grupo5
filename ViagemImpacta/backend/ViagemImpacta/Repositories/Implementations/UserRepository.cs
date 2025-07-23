using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories.Implementations;
using ViagemImpacta.Repositories.Interfaces;

public class UserRepository : Repository<User>, IUserRepository
{
    private readonly AgenciaDbContext _context;

    public UserRepository(AgenciaDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllClientUsersWithPagination(int skip, int take)
    {
        return await _context.Users.Skip(skip).Take(take).Where(u => u.Active).ToListAsync();
    }

    /*
     Marcelo : É necessário fazer a verificação de null
     */
    public async Task<User?> GetUserById(int id)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
    }

    public async Task<bool> SetUserDisabled(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        if (user == null) return false;
        user.Active = false;
        user.DisabledAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> AlreadyEmailExist(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<User?> GetUserByEmail(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Active);
    }

    public Task<User?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(User existingUser)
    {
        throw new NotImplementedException();
    }
}