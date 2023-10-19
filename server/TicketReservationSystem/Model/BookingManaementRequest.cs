
namespace TicketReservationSystem.Model
{
    /**
     * booking request class for get booking request
     * **/
    public class BookingRequest
    {
        public String fromStation { get; set; } = String.Empty;

        public String toStation { get; set; } = String.Empty;

        public DateTime journeyDate { get; set; } = new DateTime();
        public String noOfTickets { get; set; } = String.Empty;

        public String ticketclass { get; set; } = String.Empty;

        public String NIC { get; set; } = String.Empty;

        public String scheduleId { get; set; } = String.Empty;

    }
}
