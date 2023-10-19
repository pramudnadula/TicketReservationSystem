using Microsoft.AspNetCore.Identity;
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
            return userService.GetStudents();
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
                    new Claim(ClaimTypes.Role, user.Role), 
                    // Add any additional claims if needed
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
            var existingUser = userService.GetUserByEmail(request.Email);

            if (existingUser == null)
            {
                return NotFound($"user with email = {request.Email} not found");
            }
            bool verification = authService.VerifyPassword(request.Password, existingUser.Password, existingUser.PasswordKey);

            if (!verification)
            {
                return NotFound("Your email or password is wrong");
            }

            var token = GenerateJwtToken(existingUser);
            var expiration = DateTime.UtcNow.AddHours(2); // Set the expiration time here (should match the token expiration)

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

            userService.Remove(user.NIC);

            return Ok($"Student with nic = {nic} deleted");
        }

        //UPDATE active status
        [HttpPut("active/{nic}")]
        public ActionResult UpdateActiveStatus(String nic, bool active)
        {
            var existingUser = userService.Get(nic);

            if (existingUser == null)
            {
                return NotFound($"Student with nic = {nic} not found");
            }

            var userRoleClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(userRoleClaim))
            {
                return BadRequest("User role not found");
            }

            if (active)
            {
                if (userRoleClaim == "BACKOFFICE")
                {
                    userService.UpdateActiveStatus(nic, active);
                    return StatusCode(204, $"Active status updated to active");
                }
                else
                {
                    // User does not have permission so return 403 Forbidden code and message
                    return StatusCode(403, "You do not have permission to update active status");
                }
            }
            else
            {
                if (userRoleClaim == "BACKOFFICE" || userRoleClaim == "TRAVELAGENT" || userRoleClaim == "TRAVELER")
                {
                    userService.UpdateActiveStatus(nic, active);
                    return StatusCode(204, $"Active status updated to inactive");
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
