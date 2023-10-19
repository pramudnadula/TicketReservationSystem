
namespace TicketReservationSystem.Model
{
    /**
     * booking request class for get booking request
     * **/
    public class BookingRequestDto
    {
        public String Id { get; set; } = String.Empty;

        public String fromStation { get; set; } = String.Empty;

        public String toStation { get; set; } = String.Empty;

        public DateTime journeyDate { get; set; } = new DateTime();

        public String noOfTickets { get; set; } = String.Empty;

        public String ticketclass { get; set; } = String.Empty;

        public UserObjectRequest? user { get; set; } = null;

        public ScheduleObjectRequest? schedule { get; set; } = null;

    }
}
