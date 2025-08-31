using Xunit;
using EventsApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace EventsApi.Tests
{
    public class EventsControllerTests
    {
        [Fact]
        public async Task GetEvents_ReturnsJsonContent()
        {
            // Arrange
            var httpClient = new HttpClient();
            var controller = new EventsController(httpClient);

            // Act
            var result = await controller.GetEvents();

            // Assert
            var content = Assert.IsType<ContentResult>(result);
            Assert.Equal("application/json", content.ContentType);
            Assert.False(string.IsNullOrEmpty(content.Content));
        }
    }
}