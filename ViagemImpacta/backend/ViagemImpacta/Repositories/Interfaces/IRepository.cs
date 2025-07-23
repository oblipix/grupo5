using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace ViagemImpacta.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null);
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null);
        Task AddAsync(T entity);
        void Update(T entity);
        void Remove(T entity);
    }
}