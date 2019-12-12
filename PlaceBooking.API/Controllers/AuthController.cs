using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PlaceBooking.API.Dtos;
using PlaceBooking.API.Models;

namespace PlaceBooking.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthController(IConfiguration config, 
                                IMapper mapper, 
                                UserManager<User> userManager,
                                SignInManager<User> signInManager)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserForRegisterDto registerDto)
        {
            if(string.IsNullOrWhiteSpace(registerDto.UserName))
            {
                registerDto.UserName = registerDto.Email;
            }
            var userToCreate = _mapper.Map<User>(registerDto);
            var result = await _userManager.CreateAsync(userToCreate, registerDto.Password);
            if(result.Succeeded)
            {
                await _userManager.AddToRoleAsync(userToCreate,"Member");
                var userToReturn = _mapper.Map<UserToReturnDto>(userToCreate);
                return Ok(userToReturn);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserForLoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            var result = await _signInManager.CheckPasswordSignInAsync(user,loginDto.Password,false);
            if(result.Succeeded)
            {
                var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedUserName == loginDto.UserName.ToUpper());
                var userToReturn = _mapper.Map<UserToReturnDto>(appUser);
                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result,
                    user = userToReturn
                });
            }
            return Unauthorized();
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.UserName)
            };
            var roles = await _userManager.GetRolesAsync(user);
            foreach(var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    }
}