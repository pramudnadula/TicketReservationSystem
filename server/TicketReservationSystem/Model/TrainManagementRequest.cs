namespace TicketReservationSystem.Model
{
    /**
     * train request class for get train request
     * **/
    public class TrainRequest
    {
        public String TrainName { get; set; } = String.Empty;

          public String TrainClassName { get; set; } = String.Empty;

        public String StartLocation { get; set; } = String.Empty;

        public String EndLocation { get; set; } = String.Empty;

        public String DepartureTime { get; set; } = String.Empty;

        public String ArrivalTime { get; set; } = String.Empty;

         //public String Status { get; set; } = "UNPUBLISHED";


    }
}
