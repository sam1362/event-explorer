using Xunit;
using EventsApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using Moq.Protected;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace EventsApi.Tests
{
    public class EventsControllerNegativeTests
    {
        [Fact]
        public async Task GetEvents_WhenApiFails_ReturnsErrorStatus()
        {
         
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

           
            var inMemorySettings = new Dictionary<string, string>
            {
                { "Ticketmaster:ApiKey", "fake-api-key-for-test" }
            };

            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            var controller = new EventsController(httpClient, configuration);

            // Act
            var result = await controller.GetEvents();

            // Assert
            var status = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, status.StatusCode);
            Assert.Equal("Failed to fetch events", status.Value);
        }
    }
}
