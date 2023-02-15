using Abp.Authorization;
using q.Authorization.Roles;
using q.Authorization.Users;

namespace q.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
