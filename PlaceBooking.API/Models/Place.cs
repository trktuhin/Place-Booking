using System;

namespace PlaceBooking.API.Models
{
    public class Place
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public float Price { get; set; }
        public DateTime AvailableFrom { get; set; }
        public DateTime AvailableTo { get; set; }
        public string UserId { get; set; }
    }
}