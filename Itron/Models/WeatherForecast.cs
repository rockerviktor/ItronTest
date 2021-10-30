using System;
using System.ComponentModel.DataAnnotations;

namespace Itron.Models
{
    public class WeatherForecast
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        [StringLength(50)]
        public string Summary { get; set; }
    }
}
