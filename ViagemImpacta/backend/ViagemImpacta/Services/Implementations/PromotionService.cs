//using AutoMapper;
//using Microsoft.CodeAnalysis.CSharp.Syntax;
//using ViagemImpacta.DTO.Promotion;
//using ViagemImpacta.Models;
//using ViagemImpacta.Repositories;
//using ViagemImpacta.Repositories.Interfaces;
//using ViagemImpacta.Services.Interfaces;

//namespace ViagemImpacta.Services.Implementations
//{
//    public class PromotionService : IPromotionService
//    {

//        private readonly IUnitOfWork _unititOfWork;
//        private readonly IMapper _mapper;

//        public PromotionService(IUnitOfWork unititOfWork, IMapper mapper)
//        {
//            _unititOfWork = unititOfWork;
//            _mapper = mapper;
//        }

//        public async Task<Promotion?> CreatePromotionAsync(CreatePromotionDTO dto)
//        {
//            if (dto.StartDate < DateTime.UtcNow.Date || dto.StartDate > dto.EndDate) {
                
//            }
                
//        }

       
//    }
//}
