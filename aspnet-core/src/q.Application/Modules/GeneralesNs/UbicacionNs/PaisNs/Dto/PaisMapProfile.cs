using AutoMapper;
using q.Models.Generales.UbicacionNs.PaisNs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Modules.GeneralesNs.UbicacionNs.PaisNs.Dto
{
    public class PaisMapProfile : Profile
    {
        public PaisMapProfile()
        {
            CreateMap<Pais,PaisDto>()
                .ForMember(x => x.DescripcionCodigoIso, o => o.MapFrom(x => string.Concat(x.CodigoIso, " - ", x.Descripcion)));

            CreateMap<PaisDto, Pais>();
        }
    }
}
