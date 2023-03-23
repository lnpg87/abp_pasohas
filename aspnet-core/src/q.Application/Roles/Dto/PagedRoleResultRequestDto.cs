using Abp.Application.Services.Dto;

namespace q.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }

        public string Filter { get; set; }
        public string FilterProperties { get; set; }
    }
}

