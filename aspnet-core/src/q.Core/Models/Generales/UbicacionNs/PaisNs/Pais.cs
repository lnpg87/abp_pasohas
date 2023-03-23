using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Models.Generales.UbicacionNs.PaisNs
{
    public class Pais : AuditedEntity<int>
    {
        public string CodigoIso { get; set; }
        public string Descripcion { get; set; }
    }
}
