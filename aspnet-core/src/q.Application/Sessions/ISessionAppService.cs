using System.Threading.Tasks;
using Abp.Application.Services;
using q.Sessions.Dto;

namespace q.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
