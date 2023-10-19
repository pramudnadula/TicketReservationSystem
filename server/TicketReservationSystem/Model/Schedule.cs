using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace TicketReservationSystem.Model
{
    /**
     * train model class
     * **/
    public class Schedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String Id { get; set; } = String.Empty;
        [BsonElement("trainName")]
        public String TrainName { get; set; } = String.Empty;
        [BsonElement("startLocation")]
        public String StartLocation { get; set; } = String.Empty;
        [BsonElement("trainClassName")]
        public String TrainClassName { get; set; } = String.Empty;
        [BsonElement("endLocation")]
        public String EndLocation { get; set; } = String.Empty;
        [BsonElement("departureTime")]
        public String DepartureTime { get; set; } = String.Empty;
        [BsonElement("arrivalTime")]
        public String ArrivalTime { get; set; } = String.Empty;
        [BsonElement("status")]
        public String Status { get; set; } = String.Empty;


    }
}
