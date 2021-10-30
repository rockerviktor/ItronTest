using System;
using System.Collections.Generic;
using System.Linq;
using Itron.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Itron.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ApplicationDbContext databaseContext;
        private readonly ILogger<WeatherForecastController> logger;

        public WeatherForecastController(ApplicationDbContext databaseContext, ILogger<WeatherForecastController> logger)
        {
            this.databaseContext = databaseContext;
            this.logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return this.databaseContext.WeatherForecasts.ToArray().Select(databaseForecast => new WeatherForecast
            {
                Date = databaseForecast.Date,
                Summary = databaseForecast.Summary,
                TemperatureC = databaseForecast.TemperatureC
            });
        }
    }
}
