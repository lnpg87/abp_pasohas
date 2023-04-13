using Abp.Domain.Services;
using q.Models.Generales.UbicacionNs.PaisNs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Models.Generales.UbicacionNs.ProvinciaNs
{
    public interface IProvinciaManager : IDomainService
    {
        Task<Provincia> Registrar(Provincia entity);
    }
}
