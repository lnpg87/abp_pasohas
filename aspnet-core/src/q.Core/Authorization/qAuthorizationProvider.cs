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

            //GENERALES.CLIENTE
            var cliente = generales.CreateChildPermission(PermissionNames.Aplicacion_Generales_Cliente, L("Cliente"));
            cliente.CreateChildPermission(PermissionNames.Aplicacion_Generales_Cliente_Crear, L("Crear"));

            //GENERALES.UBICACION
            var ubicacion = generales.CreateChildPermission(PermissionNames.Aplicacion_Generales_Ubicacion, L("Ubicacion"));
            var pais = ubicacion.CreateChildPermission(PermissionNames.Aplicacion_Generales_Ubicacion_Pais, L("Pais"));
            pais.CreateChildPermission(PermissionNames.Aplicacion_Generales_Ubicacion_Pais_Crear, L("Crear"));

            ubicacion.CreateChildPermission(PermissionNames.Aplicacion_Generales_Ubicacion_Provincia, L("Provincia"));
            ubicacion.CreateChildPermission(PermissionNames.Aplicacion_Generales_Ubicacion_Provincia_Crear, L("Crear"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, qConsts.LocalizationSourceName);
        }
    }
}
