using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using q.EntityFrameworkCore;
using q.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace q.Web.Tests
{
    [DependsOn(
        typeof(qWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class qWebTestModule : AbpModule
    {
        public qWebTestModule(qEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(qWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(qWebMvcModule).Assembly);
        }
    }
}