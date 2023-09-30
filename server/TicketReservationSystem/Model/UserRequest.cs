
namespace TicketReservationSystem.Model
{
    /**
     * user request class for get user request
     * **/
    public class UserRequest
    {
        public String Username { get; set; } = String.Empty;

        public String Email { get; set; } = String.Empty;

        public String Password { get; set; } = String.Empty;

        public String Role { get; set; } = String.Empty;

        public bool Active { get; set; } = false;


    }
}
