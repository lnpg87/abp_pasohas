using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using q.Models.Generales.UbicacionNs.PaisNs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Modules.GeneralesNs.UbicacionNs.PaisNs.Dto
{
    [AutoMap(typeof(Pais))]
    public class PaisDto : EntityDto<int>
    {
        public string CodigoIso { get; set; }
        public string Descripcion { get; set; }
        public string DescripcionCodigoIso { get; set; }

    }
}
