
namespace TicketReservationSystem.Model
{
    /**
     * user request class for get user request
     * **/
    public class UserUpdateRequest
    {
        public String Username { get; set; } = String.Empty;

        public String Email { get; set; } = String.Empty;

        public String Role { get; set; } = String.Empty;

        public bool Active { get; set; } = false;

        public string NIC { get; set; } = String.Empty;
    }
}
