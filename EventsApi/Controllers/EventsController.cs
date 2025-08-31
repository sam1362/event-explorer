using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading.Tasks;

namespace EventsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public EventsController(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        [HttpGet("{city?}")]
        public async Task<IActionResult> GetEvents(string city = "")
        {
            string apiKey = _configuration["Ticketmaster:ApiKey"];
            string url = string.IsNullOrEmpty(city)
                ? $"https://app.ticketmaster.com/discovery/v2/events.json?apikey={apiKey}&size=100&countryCode=NO"
                : $"https://app.ticketmaster.com/discovery/v2/events.json?apikey={apiKey}&size=100&countryCode=NO&city={city}";

            try
            {
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                    return StatusCode((int)response.StatusCode, "Failed to fetch events");

                var content = await response.Content.ReadAsStringAsync();
                return Content(content, "application/json");
            }
            catch (Exception)
            {
                return StatusCode(500, "Unexpected error occurred while fetching events");
            }
        }
    }
}
