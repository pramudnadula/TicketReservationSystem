using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace TicketReservationSystem.Model
{
    /**
     * train model class
     * **/
    public class Train
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String Id { get; set; } = String.Empty;
        [BsonElement("trainName")]
        public String TrainName { get; set; } = String.Empty;
        [BsonElement("status")]
        public Boolean Status { get; set; } = false;

    }
}
