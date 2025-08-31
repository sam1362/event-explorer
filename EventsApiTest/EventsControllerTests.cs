using Xunit;
using EventsApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Moq;
using Moq.Protected;
using System.Net;
using System.Threading;

namespace EventsApi.Tests
{
    public class EventsControllerTests
    {
        [Fact]
        public async Task GetEvents_ReturnsJsonContent()
        {
            var inMemorySettings = new Dictionary<string, string>
            {
                { "Ticketmaster:ApiKey", "fake-api-key-for-test" }
            };

            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            var mockHandler = new Mock<HttpMessageHandler>();
            mockHandler.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{\"events\":[]}", System.Text.Encoding.UTF8, "application/json")
                });

            var httpClient = new HttpClient(mockHandler.Object);

            var controller = new EventsController(httpClient, configuration);

            // Act
            var result = await controller.GetEvents();

            // Assert
            var content = Assert.IsType<ContentResult>(result);
            Assert.Equal("application/json", content.ContentType);
            Assert.False(string.IsNullOrEmpty(content.Content));
            Assert.Contains("events", content.Content);
        }
    }
}
