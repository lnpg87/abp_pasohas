using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using q.Authorization.Roles;
using q.Authorization.Users;
using q.MultiTenancy;
using q.Models.Generales.UbicacionNs.PaisNs;
using q.EntityFrameworkCore._Core;
using System.Reflection.Emit;
using System.Reflection;

namespace q.EntityFrameworkCore
{
    public class qDbContext : AbpZeroDbContext<Tenant, Role, User, qDbContext>
    {
        /* Define a DbSet for each entity of the application */

        //GENERALES
        public DbSet<Pais> Pais { get; set; }
        public qDbContext(DbContextOptions<qDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ModelConfigHelper.Configurar("q.EntityFrameworkCore.Relaciones.Generales.Ubicacion", modelBuilder);

            //modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);
        }
    }
}
