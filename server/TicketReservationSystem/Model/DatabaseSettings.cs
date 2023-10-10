namespace TicketReservationSystem.Model
{
    /**
     * database settings class
     * **/
    public class DatabaseSettings : IDatabaseSettings
    {
        // get the database name
        public string DatabaseName { get; set; } = String.Empty;
        // get database connected url
        public string ConnectionString { get; set; } = String.Empty;


        // get the user collection name
        public string UserCollectionName { get; set; } = String.Empty;

          // get the Train collection name
        public string TrainCollectionName { get; set; } = String.Empty;


    }

    }
