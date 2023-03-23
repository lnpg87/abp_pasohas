using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using q.EntityFrameworkCore._Core;
using q.Models.Generales.UbicacionNs.PaisNs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.EntityFrameworkCore.Relaciones.Generales.Ubicacion
{
    public class PaisModelConfig : IModelConfig
    {
        public ModelBuilder Configurar(ModelBuilder modelbuilder)
        {
            var converter = new ValueConverter<string, string>(v => v, v => v.ToUpper());

            modelbuilder.Entity<Pais>(entidad =>
            {
                entidad.ToTable("Pais", "Generales");

                entidad.HasKey(e => e.Id);

                entidad.Property(e => e.Id);

                entidad.Property(e => e.CodigoIso)
                   .HasMaxLength(2)
                   .HasConversion(converter)
                   .IsRequired();

                entidad.Property(e => e.Descripcion)
                   .HasMaxLength(75)
                   .HasConversion(converter)
                   .IsRequired();

            });
            return modelbuilder;
        }
    }
}
