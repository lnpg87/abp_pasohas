using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace q.EntityFrameworkCore
{
    public static class qDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<qDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<qDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
