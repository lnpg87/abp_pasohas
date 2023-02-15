using System.Threading.Tasks;
using q.Configuration.Dto;

namespace q.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
