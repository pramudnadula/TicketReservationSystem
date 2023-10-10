
namespace TicketReservationSystem.Model
{
    /**
     * booking request class for get booking request
     * **/
    public class BookingRequest
    {
        public String fromStation { get; set; } = String.Empty;

        public String toStation { get; set; } = String.Empty;

        public String journeyDate { get; set; } = String.Empty;

        public String noOfTickets { get; set; } = String.Empty;

          public String ticketclass { get; set; } = String.Empty;


    }
}
