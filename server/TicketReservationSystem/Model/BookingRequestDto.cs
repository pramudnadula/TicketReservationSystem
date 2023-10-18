
namespace TicketReservationSystem.Model
{
    /**
     * booking request class for get booking request
     * **/
    public class BookingRequestDto
    {
        public String fromStation { get; set; } = String.Empty;

        public String toStation { get; set; } = String.Empty;

        public DateTime journeyDate { get; set; } = new DateTime();

        public String noOfTickets { get; set; } = String.Empty;

        public String ticketclass { get; set; } = String.Empty;

        public UserUpdateRequest user { get; set; } = null;

    }
}
