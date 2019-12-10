using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PlaceBooking.API.Models;

namespace PlaceBooking.API.Data
{
    public class DataContext: IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){}

        public DbSet<Place> Places { get; set; }
    }
}