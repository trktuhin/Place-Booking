using System;
using Microsoft.AspNetCore.Identity;

namespace PlaceBooking.API.Models
{
    public class User: IdentityUser
    {
        public string Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastModifiedOn { get; set; }
    }
}