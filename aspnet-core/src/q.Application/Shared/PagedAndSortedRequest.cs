using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace q.Shared
{
    public class PagedAndSortedRequest : PagedResultRequestDto, IPagedAndSortedResultRequest, IPagedResultRequest, ILimitedResultRequest, ISortedResultRequest
    {
        public string Sorting { get; set; }
        public string Filter { get; set; }
        public string FilterProperties { get; set; }
    }
}
