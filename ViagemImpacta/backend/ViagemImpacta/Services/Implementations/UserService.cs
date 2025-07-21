using AutoMapper;
using System.ComponentModel.DataAnnotations;
using ViagemImpacta.DTO.UserDTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<User>> ListAllClients(int skip, int take)
        {
            return await _unitOfWork.Users
                .GetAllClientUsersWithPagination(skip, take);
        }

        public async Task<User?> ValidateUserAsync(ReadUserLoginDTO dto)
        {
            var user = await _unitOfWork.Users.GetUserByEmail(dto.Email.ToLower().Trim());
            if (user == null || user.Password != dto.Password) return null;
            return user;
        }
    }
}
