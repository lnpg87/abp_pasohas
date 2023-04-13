using Abp.Application.Services;
using q.Modules.GeneralesNs.UbicacionNs.ProvinciaNs.Dto;
using q.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Modules.GeneralesNs.UbicacionNs.ProvinciaNs
{
    public interface IProvinciaAppService : IAsyncCrudAppService<ProvinciaDto, int, PagedAndSortedRequest,ProvinciaDto,ProvinciaDto>
    {
    }
}
