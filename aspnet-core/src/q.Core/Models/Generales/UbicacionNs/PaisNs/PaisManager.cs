using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Models.Generales.UbicacionNs.PaisNs
{
    public class PaisManager : DomainService, IPaisManager
    {
        private readonly IRepository<Pais> _paisRepository;

        public PaisManager(IRepository<Pais> paisRepository)
        {
            LocalizationSourceName = qConsts.LocalizationSourceName;

            _paisRepository = paisRepository;
        }

        private void Validate(Pais pais)
        {
            if (_paisRepository.FirstOrDefault(x => x.CodigoIso.ToLower() == pais.CodigoIso.ToLower())?.Id > 0)
            {
                throw new UserFriendlyException("¡Ya existe!", "Este identificador ya está siendo utilizado");
            }
        }

        public async Task<Pais> Registrar(Pais entity)
        {
            Validate(entity);
            return await _paisRepository.InsertAsync(entity);
        }
    }
}
