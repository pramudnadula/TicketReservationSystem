
namespace TicketReservationSystem.Model
{
    /**
     * user request class for get user request
     * **/
    public class PasswordUpdateRequest
    {
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }

}
