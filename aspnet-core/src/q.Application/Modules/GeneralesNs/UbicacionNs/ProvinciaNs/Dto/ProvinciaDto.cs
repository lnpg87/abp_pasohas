using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using q.Models.Generales.UbicacionNs.PaisNs;
using q.Models.Generales.UbicacionNs.ProvinciaNs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Modules.GeneralesNs.UbicacionNs.ProvinciaNs.Dto
{
    [AutoMap(typeof(Provincia))]
    public class ProvinciaDto : EntityDto<int>
    {
        public string Descripcion { get; set; }
        public int PaisId { get; set; }
        public string PaisDescripcion { get; set; }
    }
}
