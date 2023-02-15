using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using q.Authorization;

namespace q
{
    [DependsOn(
        typeof(qCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class qApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<qAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(qApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
