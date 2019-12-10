using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using PlaceBooking.API.Models;

namespace PlaceBooking.API.Data
{
    public class Seed
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;


        public Seed(RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public void SeedRoles()
        {
            if (!_userManager.Users.Any())
            {

                var roles = new List<IdentityRole>
                {
                    new IdentityRole{Name = "Member"},
                    new IdentityRole{Name = "Moderator"},
                    new IdentityRole {Name = "Admin" }
                };

                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }
                var adminUser = new User
                {
                    UserName = "Admin"
                };
                IdentityResult result = _userManager.CreateAsync(adminUser, "password").Result;
                if(result.Succeeded)
                {
                    var admin = _userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRolesAsync(admin, new [] {"Admin", "Moderator"}).Wait();
                }
            }

        }
    }
}