using Abp.Domain.Entities.Auditing;
using q.Models.Generales.UbicacionNs.PaisNs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Models.Generales.UbicacionNs.ProvinciaNs
{
    public class Provincia : AuditedEntity<int>
    {
        public string Descripcion { get; set; }
        public int PaisId { get; set; }
        public virtual Pais Pais { get; set; }
    }
}
