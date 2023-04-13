using AutoMapper;
using q.Models.Generales.UbicacionNs.ProvinciaNs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Modules.GeneralesNs.UbicacionNs.ProvinciaNs.Dto
{
    public class ProvinciaMapProfile : Profile
    {
        public ProvinciaMapProfile()
        {
            CreateMap<Provincia, ProvinciaDto>()
                .ForMember(x=>x.PaisDescripcion,o=>o.MapFrom(x=>string.Concat(x.Pais.Descripcion)));
        }
    }
}
