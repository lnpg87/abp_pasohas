using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using q.Authorization.Roles;
using q.Authorization.Users;
using q.MultiTenancy;

namespace q.EntityFrameworkCore
{
    public class qDbContext : AbpZeroDbContext<Tenant, Role, User, qDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public qDbContext(DbContextOptions<qDbContext> options)
            : base(options)
        {
        }
    }
}
