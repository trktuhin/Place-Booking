using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlaceBooking.API.Data;

namespace PlaceBooking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceController : ControllerBase
    {
        private readonly DataContext _context;
        public PlaceController(DataContext context)
        {
            _context = context;

        }
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var places = _context.Places.ToList();
            return Ok(places);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var place = _context.Places.FirstOrDefault(p => p.Id == id);
            return Ok(place);  
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
