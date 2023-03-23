using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Models.Generales.UbicacionNs.PaisNs
{
    public interface IPaisManager : IDomainService
    {
        Task<Pais> Registrar(Pais entity);
    }
}
