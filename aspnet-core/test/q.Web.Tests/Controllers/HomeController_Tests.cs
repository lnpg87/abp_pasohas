using System.Threading.Tasks;
using q.Models.TokenAuth;
using q.Web.Controllers;
using Shouldly;
using Xunit;

namespace q.Web.Tests.Controllers
{
    public class HomeController_Tests: qWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}