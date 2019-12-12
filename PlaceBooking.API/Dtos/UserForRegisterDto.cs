using System;
using System.ComponentModel.DataAnnotations;

namespace PlaceBooking.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required]
        [StringLength(8,MinimumLength=5,ErrorMessage="You must specify password between 5 and 8")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }
        
        [Required]
        public DateTime CreatedOn { get; set; }
        public UserForRegisterDto()
        {
            CreatedOn = DateTime.Now;
        }
    }
}