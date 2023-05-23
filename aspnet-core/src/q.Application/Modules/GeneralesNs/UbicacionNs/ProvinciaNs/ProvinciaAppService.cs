using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using q.Authorization;
using q.Models.Generales.UbicacionNs.PaisNs;
using q.Shared;
using q.Models.Generales.UbicacionNs.ProvinciaNs;
using q.Modules.GeneralesNs.UbicacionNs.ProvinciaNs.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace q.Modules.GeneralesNs.UbicacionNs.ProvinciaNs
{
   // [AbpAuthorize(PermissionNames.Aplicacion_Generales_Ubicacion_Provincia)]
    public class ProvinciaAppService : AsyncCrudAppService<Provincia, ProvinciaDto, int, PagedAndSortedRequest, ProvinciaDto, ProvinciaDto>, IProvinciaAppService
    {

        IProvinciaManager _provinciaManager;
        public ProvinciaAppService(IRepository<Provincia> repository, IProvinciaManager provinciaManager) : base(repository)
        {
            _provinciaManager = provinciaManager;
        }


        protected override IQueryable<Provincia> ApplySorting(IQueryable<Provincia> query, PagedAndSortedRequest input)
        {
            try
            {
                if (input.Sorting.IsNullOrEmpty())
                {
                    input.Sorting = "descripcion asc";
                }
            }
            catch (Exception)
            {
                input.Sorting = "descripcion asc";
            }
            return base.ApplySorting(query, input);
        }

        protected override IQueryable<Provincia> CreateFilteredQuery(PagedAndSortedRequest input)
        {
            return Repository.GetAllIncluding(x => x.Pais)
                            .WhereIf(!input.Filter.IsNullOrWhiteSpace(), x => x.Descripcion.StartsWith(input.Filter));
        }

        public override Task<PagedResultDto<ProvinciaDto>> GetAllAsync(PagedAndSortedRequest input)
        {
            var lista = new List<Provincia>();
            var query = Repository.GetAllIncluding(x => x.Pais);

            query = CreateFilteredQuery(input);
            query = ApplySorting(query, input);
            query = FilterHelper<Provincia>.FilerByProperties(input.FilterProperties, query);


            lista = query
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToList();

            var result = new PagedResultDto<ProvinciaDto>(query.Count(), ObjectMapper.Map<List<ProvinciaDto>>(lista));
            return Task.FromResult(result);
        }
    }
}
