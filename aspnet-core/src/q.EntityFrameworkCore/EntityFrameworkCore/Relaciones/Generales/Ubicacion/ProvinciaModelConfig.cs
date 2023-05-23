using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using q.EntityFrameworkCore._Core;
using q.Models.Generales.UbicacionNs.ProvinciaNs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.EntityFrameworkCore.Relaciones.Generales.Ubicacion
{
    public class ProvinciaModelConfig : IModelConfig
    {
        public ModelBuilder Configurar(ModelBuilder modelbuilder)
        {
            var converter = new ValueConverter<string, string>(v => v, v => v.ToUpper());

            modelbuilder.Entity<Provincia>(entity =>
            {
                entity.ToTable("Provincia", "Generales");
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Id);

                entity.Property(x => x.Descripcion)
                .HasConversion(converter)
                .HasMaxLength(150)
                .IsRequired();

                entity.HasOne(x => x.Pais)
                .WithMany()
                .HasForeignKey(x => x.PaisId)
                .HasConstraintName("fk_provincia_pais")
                .OnDelete(DeleteBehavior.Restrict);
            });

            return modelbuilder;
        }
    }
}
