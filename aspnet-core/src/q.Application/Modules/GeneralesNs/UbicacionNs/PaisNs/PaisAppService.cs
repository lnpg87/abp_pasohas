using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using q.Authorization;
using q.Models.Generales.UbicacionNs.PaisNs;
using q.Modules.GeneralesNs.UbicacionNs.PaisNs.Dto;
using q.Shared;
using System;
using System.Linq;

namespace q.Modules.GeneralesNs.UbicacionNs.PaisNs
{
    [AbpAuthorize(PermissionNames.Aplicacion_Generales_Ubicacion_Pais)]
    public class PaisAppService : AsyncCrudAppService<Pais, PaisDto, int, PagedAndSortedRequest, PaisDto, PaisDto>, IPaisAppService
    {
        private readonly IPaisManager _paisManager;

        public PaisAppService(IRepository<Pais, int> repository, IPaisManager paisManager) : base(repository)
        {
            _paisManager = paisManager;
        }

        protected override IQueryable<Pais> ApplySorting(IQueryable<Pais> query, PagedAndSortedRequest input)
        {
            try
            {
                if (input.Sorting.IsNullOrEmpty())
                {
                    input.Sorting = "CodigoIso asc";
                }
            }
            catch (Exception)
            {
                input.Sorting = "CodigoIso asc";
            }

            return base.ApplySorting(query, input);
        }


        protected override IQueryable<Pais> CreateFilteredQuery(PagedAndSortedRequest input)
        {


            if (input.Filter == null || input.Filter == "null")
            {
                input.Filter = "";
            }

            //var _result = 

            return Repository.GetAll().
                            WhereIf(!input.Filter.IsNullOrWhiteSpace(), x => x.Descripcion.ToUpper().Contains(input.Filter.ToUpper()));
        }
    }
}
