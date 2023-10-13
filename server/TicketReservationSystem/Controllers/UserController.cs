using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TicketReservationSystem.Auth;
using TicketReservationSystem.Model;
using TicketReservationSystem.Service;
using System.Security;

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

            return Ok(existingUser);
        }

        // PUT api/<UserController>/5
        [HttpPut("{nic}")]
        public ActionResult Put(String nic, [FromBody] User user)
        {
            var existingUser = userService.Get(nic);

            if (existingUser == null)
            {
                return NotFound($"Student with nic = {nic} not found");
            }

            // Check if the user provided a non-null password
            if (user.Password != null)
            {
                // Update password and passwordKey if not null
                existingUser.Password = user.Password;
                existingUser.PasswordKey = user.PasswordKey;
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
        public ActionResult UpdateActiveStatus(String nic, [FromBody] User user)
        {
            var existingUser = userService.Get(nic);

            if (existingUser == null)
            {
                return NotFound($"Student with nic = {nic} not found");
            }

            userService.UpdateActiveStatus(nic, user.Active);


            // Return a success message along with the value of user.Active
            return Ok($"Active status updated to {(user.Active ? "active" : "inactive")}");
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
