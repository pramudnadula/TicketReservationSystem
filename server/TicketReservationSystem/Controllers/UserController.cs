﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TicketReservationSystem.Auth;
using TicketReservationSystem.Model;
using TicketReservationSystem.Service;
using System.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using System.Text.RegularExpressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TicketReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /**
     * user controller class
     * **/
    public class UserController : ControllerBase
    {
        // variable for hold servies interfaces
        private readonly IUserService userService;
        private readonly IAuthHashService authService;
        // constructor 
        public UserController(IUserService userService, IAuthHashService authService)
        {
            this.userService = userService;
            this.authService = authService;
        }

        // GET: api/<UserController>
        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            return userService.GetUsers();
        }

        // GET api/<UserController>/5
        [HttpGet("{nic}")]
        public ActionResult<User> Get(String nic)
        {
            var user = userService.Get(nic);
            if (user == null)
            {
                return NotFound($"user with nic = {nic} not found");
            }

            return user;
        }

        // POST api/<UserController>
        [HttpPost("registration")]
        public ActionResult<User> Registration([FromBody] UserRequest request)
        {
            if (request.Username == null || request.Email == null || request.Password == null || request.Role == null || request.NIC == null)
            {
                return BadRequest("Fail to registre");
            }
            // Check if a user with the provided NIC already exists
            var existingUser = userService.Get(request.NIC);
            if (existingUser != null)
            {
                return BadRequest("A user with this NIC already exists");
            }
            // const nicRegex12 = /^[0-9]{12}$/;
            //       const nicRegex9 = /^[0-9]{9}[vV]$/;
            // Validate NIC format using a regular expression
            string nicRegex12 = @"^[0-9]{12}$";
            string nicRegex9 = @"^[0-9]{9}[vV]$";
            if (!Regex.IsMatch(request.NIC, nicRegex12) && !Regex.IsMatch(request.NIC, nicRegex9))
            {
                return BadRequest("NIC must be 12 digits or 9 digits and v = 123456789v or 123456789123");
            }

            // Check if a user with the provided email already exists
            existingUser = userService.GetUserByEmail(request.Email);
            if (existingUser != null)
            {
                return BadRequest("A user with this email already exists");
            }

            authService.PasswordHashing(request.Password, out byte[] passwordHash, out byte[] passwordKey);

            User user = new User();
            user.NIC = request.NIC;
            user.Username = request.Username;
            user.Email = request.Email;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;
            user.Role = request.Role;
            user.Active = request.Active;

            userService.Create(user);
            // nic is primary key 
            return CreatedAtAction(nameof(Get), new { nic = user.NIC }, user);
        }

        private string GenerateJwtToken(User user)
        {
            // Use a long and random key
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("24sxdf5g6h7j8k9l0;./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "YourIssuer",
                audience: "YourAudience",
                claims: new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    // user role 
                    new Claim(ClaimTypes.Role, user.Role), 
                    // user nic
                    new Claim(ClaimTypes.Name, user.NIC)
                },
                expires: DateTime.UtcNow.AddHours(2), // Set the expiration time here
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        //POST login api 
        [HttpPost("login")]
        public ActionResult<User> Login([FromBody] UserRequest request)
        {
            if (request.Email == null || request.Password == null)
            {
                return BadRequest("Fail to login");
            }
            // Check if a user with the provided email exists
            var existingUser = userService.GetUserByEmail(request.Email);
            if (existingUser == null)
            {
                return NotFound($"user with email = {request.Email} not found");
            }
            // Check if the provided password matches the stored password hash
            bool verification = authService.VerifyPassword(request.Password, existingUser.Password, existingUser.PasswordKey);
            if (!verification)
            {
                return NotFound("Your email or password is wrong");
            }

            // if user is not active
            if (!existingUser.Active)
            {
                return BadRequest("User has been deactivated");
            }

            // Generate JWT token
            var token = GenerateJwtToken(existingUser);
            var expiration = DateTime.UtcNow.AddHours(2); // Set the expiration time - (should match the token expiration)

            // Store the token in session
            HttpContext.Session.SetString("AccessToken", token);
            // existingUser 
            return Ok(new { Token = token, Expiration = expiration, existingUser.NIC, existingUser.Username, existingUser.Email, existingUser.Role, existingUser.Active });
        }

        // PUT api/<UserController>/5
        [HttpPut("{nic}")]
        public ActionResult Put(String nic, [FromBody] UserUpdateRequest user)
        {
            var existingUser = userService.Get(nic);

            if (existingUser == null)
            {
                return NotFound($"Student with nic = {nic} not found");
            }

            // Update other fields if needed
            existingUser.Username = user.Username;
            existingUser.Email = user.Email;
            existingUser.Role = user.Role;
            existingUser.Active = user.Active;

            userService.Update(nic, existingUser);

            return NoContent();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{nic}")]
        public ActionResult Delete(String nic)
        {
            var user = userService.Get(nic);

            if (user == null)
            {
                return NotFound($"Student with nic = {nic} not found");
            }

            // Get the user role from the JWT token claims (if the token is valid)
            var userRoleClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            // get current user nic
            var userNicClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

            // check if user is trying to delete his own account 
            if (userNicClaim == nic)
            {
                return BadRequest("You cannot delete your own account");
            }

            // check if user role claim is null or empty
            if (string.IsNullOrEmpty(userRoleClaim))
            {
                return BadRequest("User role not found");
            }

            // check if user role is backoffice or travelagent
            if (userRoleClaim == "BACKOFFICE" || userRoleClaim == "TRAVELAGENT")
            {
                // check if user nic foreign key is used in other tables
                if (userService.IsUserForeignKeyUsed(nic))
                {
                    return BadRequest("You cannot delete this user because it is used in other tables");
                }

                userService.Remove(user.NIC);
                return Ok($"You have successfully deleted the user with NIC = {nic}");
            }
            else
            {
                // User does not have permission so return 403 Forbidden code and message
                return StatusCode(403, "You do not have permission to delete the user");
            }
        }

        // UPDATE active status
        [HttpPut("active/{nic}")]
        public ActionResult UpdateActiveStatus(String nic, bool active)
        {
            var existingUser = userService.Get(nic);

            if (existingUser == null)
            {
                return NotFound($"Student with nic = {nic} not found");
            }

            // Get the user role from the JWT token claims (if the token is valid)
            var userRoleClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            // get current user nic
            var userNicClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;


            if (string.IsNullOrEmpty(userRoleClaim))
            {
                return BadRequest("User role not found");
            }

            if (active)
            {
                if (userRoleClaim == "BACKOFFICE")
                {
                    userService.UpdateActiveStatus(nic, active);
                    return Ok("You have successfully activated the user");
                }
                else
                {
                    // User does not have permission so return 403 Forbidden code and message
                    return StatusCode(403, "You do not have permission to update active status");
                }
            }
            else
            {
                if (userRoleClaim == "BACKOFFICE" || userRoleClaim == "TRAVELER")
                {
                    // only backoffice and travel agent cannot deactivate his own account
                    if (userNicClaim == nic && userRoleClaim == "BACKOFFICE")
                    {
                        return BadRequest("You cannot deactivate your own account");
                    }
                    userService.UpdateActiveStatus(nic, active);
                    return Ok("You have successfully deactivated the user");
                }
                else
                {
                    return StatusCode(403, "You do not have permission to update active status");
                }
            }
        }



        // PUT api/<UserController>/updatepassword/5
        [HttpPut("updatepassword/{nic}")]
        public ActionResult UpdatePassword(String nic, [FromBody] PasswordUpdateRequest request)
        {
            var existingUser = userService.Get(nic);

            if (existingUser == null)
            {
                return NotFound($"User with NIC = {nic} not found");
            }

            if (request.OldPassword == null)
            {
                return BadRequest("Old password cannot be empty");
            }

            // if user is not active
            if (!existingUser.Active)
            {
                return BadRequest("User has been deactivated");
            }

            // Check if the provided old password matches the stored password hash
            bool verification = authService.VerifyPassword(request.OldPassword, existingUser.Password, existingUser.PasswordKey);

            if (!verification)
            {
                return BadRequest("Old password is incorrect");
            }

            if (request.NewPassword == null)
            {
                return BadRequest("New password cannot be empty");
            }

            // Hash the new password and update the user's information
            authService.PasswordHashing(request.NewPassword, out byte[] passwordHash, out byte[] passwordKey);

            existingUser.Password = passwordHash;
            existingUser.PasswordKey = passwordKey;

            userService.Update(nic, existingUser);

            return Ok("Password updated successfully");
        }


    }
}
