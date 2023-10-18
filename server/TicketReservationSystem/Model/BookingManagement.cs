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
        public DateTime journeyDate { get; set; } = new DateTime();
        [BsonElement("noOfTickets")]
        public String noOfTickets { get; set; } = String.Empty;
        [BsonElement("ticketclass")]
        public String ticketclass { get; set; } = String.Empty;
        [BsonElement("NIC")]
        public String NIC { get; set; } = String.Empty;

    }
}
