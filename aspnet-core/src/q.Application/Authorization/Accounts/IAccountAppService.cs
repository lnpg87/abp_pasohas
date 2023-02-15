﻿using System.Threading.Tasks;
using Abp.Application.Services;
using q.Authorization.Accounts.Dto;

namespace q.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
