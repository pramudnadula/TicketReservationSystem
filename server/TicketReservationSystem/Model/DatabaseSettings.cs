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

    // get the Schedule collection name
    public string ScheduleCollectionName { get; set; } = String.Empty;


    // get the Booking collection name
    public string BookingCollectionName { get; set; } = String.Empty;


  }

}
