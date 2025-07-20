using AutoMapper;
using ViagemImpacta.DTO;
using ViagemImpacta.Models;
using ViagemImpacta.Repositories;
using ViagemImpacta.Services.Interfaces;

namespace ViagemImpacta.Services
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



        public async Task<User> CreateUser(CreateUserDTO createUserDTO)
        {
            if (await _unitOfWork.Users.AlreadyEmailExist(createUserDTO.Email))
            {
                throw new Exception("Já existe um usuário com este email.");
            }
            var user = _mapper.Map<User>(createUserDTO);
            user.Active = true;
            user.CreatedAt = DateTime.UtcNow;

            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.CommitAsync();
            return user;


        }

    }
}
