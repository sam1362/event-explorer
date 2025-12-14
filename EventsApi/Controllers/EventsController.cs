using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System;

namespace EventsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;

        public EventsController(HttpClient httpClient, IConfiguration configuration, IMemoryCache cache)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _cache = cache;
        }

        [HttpGet("{city?}")]
        public async Task<IActionResult> GetEvents(string city = "")
        {
            string apiKey = _configuration["Ticketmaster:ApiKey"];

            //  build URL dynamically
            string url = string.IsNullOrEmpty(city)
                ? $"https://app.ticketmaster.com/discovery/v2/events.json?apikey={apiKey}&size=50&countryCode=NO"
                : $"https://app.ticketmaster.com/discovery/v2/events.json?apikey={apiKey}&size=50&countryCode=NO&city={city}";

            //  create a cache key per city
            string cacheKey = string.IsNullOrEmpty(city) ? "events_all" : $"events_{city.ToLower()}";

            //  if cached data exists, return immediately
            if (_cache.TryGetValue(cacheKey, out string cachedData))
            {
                return Content(cachedData, "application/json");
            }

            try
            {
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                    return StatusCode((int)response.StatusCode, "Failed to fetch events");

                var content = await response.Content.ReadAsStringAsync();

                //  cache the result for 3 minutes
                _cache.Set(cacheKey, content, TimeSpan.FromMinutes(3));

                return Content(content, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Unexpected error occurred while fetching events: {ex.Message}");
            }
        }
    }
}
