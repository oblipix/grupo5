using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
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
        return await _context.Users.Skip(skip).Take(take).ToListAsync();
    }

    /*
     Marcelo : É necessário fazer a verificação de null
     */
    public async Task<User?> GetUserById(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        return user;
    }

    public async Task<bool> SetUserDisabled(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        if (user == null) return false;
        user.Active = false;
        user.DisabledAt = DateTime.UtcNow;
        return true;
    }
}