
namespace TicketReservationSystem.Model
{
    /**
     * user request class for get user request
     * **/
    public class ScheduleObjectRequest
    {
        public String Id { get; set; } = String.Empty;

        public Train Train { get; set; } = new Train();

        public String TrainClassName { get; set; } = String.Empty;

        public String StartLocation { get; set; } = String.Empty;

        public String EndLocation { get; set; } = String.Empty;

        public String DepartureTime { get; set; } = String.Empty;

        public String ArrivalTime { get; set; } = String.Empty;

        public String Status { get; set; } = String.Empty;

    }

}
