using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using q.Authorization;
using q.Models.Generales.UbicacionNs.PaisNs;
using q.Models.Generales.UbicacionNs.ProvinciaNs;
using q.Modules.GeneralesNs.UbicacionNs.ProvinciaNs.Dto;
using q.Shared;
using System;
using System.Linq;

namespace q.Modules.GeneralesNs.UbicacionNs.ProvinciaNs
{
   // [AbpAuthorize(PermissionNames.Aplicacion_Generales_Ubicacion_Provincia)]
    public class ProvinciaAppService : AsyncCrudAppService<Provincia, ProvinciaDto, int, PagedAndSortedRequest, ProvinciaDto, ProvinciaDto>, IProvinciaAppService
    {
       

        public ProvinciaAppService(IRepository<Provincia, int> repository) : base(repository)
        {
            
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
