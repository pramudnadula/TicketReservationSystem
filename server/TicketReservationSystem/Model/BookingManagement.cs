using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace TicketReservationSystem.Model
{
    /**
     * booking model class
     * **/
    public class Booking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String Id { get; set; } = String.Empty;
        [BsonElement("fromStation")]
        public String fromStation { get; set; } = String.Empty;
        [BsonElement("toStation")]
        public String toStation { get; set; } = String.Empty;
        [BsonElement("journeyDate")]
        public String journeyDate { get; set; } = String.Empty;
        [BsonElement("noOfTickets")]
        public String noOfTickets { get; set; } = String.Empty;
        [BsonElement("ticketclass")]
        public String ticketclass { get; set; } = String.Empty;
        // user NIC as Object
        [BsonElement("user")]
        public User User { get; set; } = new User();

        [BsonElement("NIC")]
        public String NIC { get; set; } = String.Empty;




    }
}
