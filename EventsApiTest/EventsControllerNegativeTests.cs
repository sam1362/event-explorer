using Xunit;
using EventsApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using Moq.Protected;

namespace EventsApi.Tests
{
    public class EventsControllerNegativeTests
    {
        [Fact]
        public async Task GetEvents_WhenApiFails_ReturnsErrorStatus()
        {
            // Arrange: ساختن HttpClient ساختگی که پاسخ 500 می‌ده
            var mockHandler = new Mock<HttpMessageHandler>();
            mockHandler
                .Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Content = new StringContent("Something went wrong")
                });

            var httpClient = new HttpClient(mockHandler.Object);
            var controller = new EventsController(httpClient);

            // Act
            var result = await controller.GetEvents();

            // Assert
            var status = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, status.StatusCode);
            Assert.Equal("Failed to fetch events", status.Value);
        }
    }
}
