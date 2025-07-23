using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
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

    public async Task<IEnumerable<User>> GetUserByPredicate(Expression<Func<User, bool>> predicate, int skip, int take)
    {
        return await _context.Users
            .Where(u => u.Active)
            .Where(predicate)
            .Skip(skip)
            .Take(take)
            .ToListAsync();
    }

    public Task<IEnumerable<User>> GetAllClients(int skip, int take)
    {
        return GetUserByPredicate(u => u.Role == Roles.User, 
            skip, take);
    }

    public Task<IEnumerable<User>> GetAllEmployees(int skip, int take)
    {
        return GetUserByPredicate(u => u.Role != Roles.User, 
            skip, take);
    }

    public async Task<bool> AlreadyEmailExist(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<User?> GetUserByEmail(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Active);
    }

    public async Task<IEnumerable<User>> SearchClientUsers(string search, int skip, int take)
    {
        var query = _context.Users.Where(u => u.Active);
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(u => u.Cpf.Contains(search) || 
            u.FirstName.Contains(search) || 
            u.LastName.Contains(search) || 
            u.Email.Contains(search));
        }
        return await query.ToListAsync();
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