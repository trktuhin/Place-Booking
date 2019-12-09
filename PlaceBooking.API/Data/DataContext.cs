using Microsoft.EntityFrameworkCore;
using PlaceBooking.API.Models;

namespace PlaceBooking.API.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){}

        public DbSet<Place> Places { get; set; }
    }
}