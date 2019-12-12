using System;

namespace PlaceBooking.API.Dtos
{
    public class UserToReturnDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}