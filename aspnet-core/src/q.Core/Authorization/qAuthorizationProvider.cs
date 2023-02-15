using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace q.Authorization
{
    public class qAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            //MODULOS
            var aplicacion = context.GetPermissionOrNull(PermissionNames.Aplicacion) ?? context.CreatePermission(PermissionNames.Aplicacion, L("Aplicacion"));
            var generales = aplicacion.CreateChildPermission(PermissionNames.Aplicacion_Generales, L("Generales"));

            //CLIENTE
            var cliente = generales.CreateChildPermission(PermissionNames.Aplicacion_Generales_Cliente, L("Cliente"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, qConsts.LocalizationSourceName);
        }
    }
}
