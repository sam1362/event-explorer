using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace EventsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public EventsController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("{city?}")]
        public async Task<IActionResult> GetEvents(string city = "")
        {
            string apiKey = "ibL9spVSAHWGHuAYTRpIzXQ6hYgrj8iN"; 
            string url = string.IsNullOrEmpty(city)
                ? $"https://app.ticketmaster.com/discovery/v2/events.json?apikey={apiKey}&size=100&countryCode=NO"
                : $"https://app.ticketmaster.com/discovery/v2/events.json?apikey={apiKey}&size=100&countryCode=NO&city={city}";

            try
            {
                var response = await _httpClient.GetStringAsync(url);
                return Content(response, "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Failed to fetch events", details = ex.Message });
            }
        }
    }
}
