using ApiCatalogo.Repositories;
using Microsoft.EntityFrameworkCore;
using ViagemImpacta.Data;

namespace ViagemImpacta.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        // Marcelo : troquei de public para privado, para evitar o erro de herança na chamada do context nas classes filhas
        private readonly AgenciaDbContext _context;

        public Repository(AgenciaDbContext context)
        {
            _context = context;
        }

        public Task<T> AddAsync(T entity)
        {
            _context.Set<T>().Add(entity);
            return Task.FromResult(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
           var entity=await _context.Set<T>().FindAsync(id);

            if (entity == null)
            {
                return false;
            }
              _context.Set<T>().Remove(entity);
            return true;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();        
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
           
            return entity;
        }

        public Task<T> UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            return Task.FromResult(entity);
        }
    }
}
