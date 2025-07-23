using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;
using ViagemImpacta.Models;
using ViagemImpacta.Models.Enums;
using ViagemImpacta.Repositories.Implementations;
using ViagemImpacta.Repositories.Interfaces;

public class UserRepository : Repository<User>, IUserRepository
{
    private readonly AgenciaDbContext _context;

    public UserRepository(AgenciaDbContext context) : base(context)
    {
        _context = context;
    }

    // IMPLEMENTANDO A VERIFICAÇÃO DE USUÁRIO POR ROLES E SE ESTÁ ATIVO
    public async Task<IEnumerable<User>> GetAllClients(int skip, int take)
    {
        return await _context.Users
            .Skip(skip)
            .Take(take)
            .Where(u => u.Active && u.Role == Roles.User)
            .ToListAsync();
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

    // COPILOT FEZ
    public async Task<IEnumerable<User>> SearchClientUsers(string search, int skip, int take)
    {
        // ADICIONAR UM TRIM
        var query = _context.Users.Where(u => u.Active);
        if (!string.IsNullOrWhiteSpace(search.Trim()))
        {
            query = query.Where(u => u.Cpf.Contains(search) || 
            u.FirstName.Contains(search) || 
            u.LastName.Contains(search) || 
            u.Email.Contains(search));
        }
        return await query.Skip(skip).Take(take).ToListAsync();
    }
}