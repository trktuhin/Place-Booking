using AutoMapper;
using PlaceBooking.API.Dtos;
using PlaceBooking.API.Models;

namespace PlaceBooking.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserToReturnDto>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}