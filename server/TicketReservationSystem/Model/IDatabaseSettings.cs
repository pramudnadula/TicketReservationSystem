namespace TicketReservationSystem.Model
{
    /**
     * detabase settings interface
     * **/
    public interface IDatabaseSettings
    {
        // get the database name
        string DatabaseName { get; set; }
        // get database connected url
        string ConnectionString { get; set; }


        // get the user collection name
        string UserCollectionName { get; set; }

        // get the train collection name
        string ScheduleCollectionName { get; set; }

        // get the booking collection name
        string BookingCollectionName { get; set; }

        // get the train collection name
        string TrainCollectionName { get; set; }



    }
}
