using Abp.Application.Services;
using q.Modules.GeneralesNs.UbicacionNs.PaisNs.Dto;
using q.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Modules.GeneralesNs.UbicacionNs.PaisNs
{
    public interface IPaisAppService : IAsyncCrudAppService<PaisDto, int, PagedAndSortedRequest, PaisDto, PaisDto>
    {
    }
}
