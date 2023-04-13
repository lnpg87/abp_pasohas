using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using q.Models.Generales.UbicacionNs.PaisNs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Models.Generales.UbicacionNs.ProvinciaNs
{
    public class ProvinciaManager : DomainService, IProvinciaManager
    {
        private readonly IRepository<Provincia> _provinciaRepository;
        public ProvinciaManager(IRepository<Provincia> provinciaRepository)
        {
            LocalizationSourceName = qConsts.LocalizationSourceName;

            _provinciaRepository = provinciaRepository;
        }

        private void Validate(Provincia provincia)
        {
            if (_provinciaRepository.FirstOrDefault(x => x.Id == provincia.Id)?.Id > 0)
            {
                throw new UserFriendlyException("¡Ya existe!", "Este identificador ya está siendo utilizado");
            }
        }

        public async Task<Provincia> Registrar(Provincia entity)
        {
            Validate(entity);
            return await _provinciaRepository.InsertAsync(entity);
        }
    }
}
