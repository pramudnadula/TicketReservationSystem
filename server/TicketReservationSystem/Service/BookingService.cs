using MongoDB.Driver;
using TicketReservationSystem.Model;

namespace TicketReservationSystem.Service
{
    /** 
     * booking service class
     * **/
    public class BookingService : IBookingService
    {
        // veriable for hold mongo colllection
        private readonly IMongoCollection<Booking> _booking;

        //constructor 
        public BookingService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _booking = database.GetCollection<Booking>(settings.BookingCollectionName);
        }

        // create booking 
        public Booking Create(Booking booking)
        {
            _booking.InsertOne(booking);
            return booking;
        }

        // get booking using id
        public Booking Get(string id)
        {
            return _booking.Find(booking => booking.Id == id).FirstOrDefault();
        }

        // get booking using booking name
        public Booking GetBookingbyformStation(string fromStation)
        {
            return _booking.Find(booking => booking.fromStation == fromStation).FirstOrDefault();
        }

        // get all booking in the collection
        public List<Booking> GetBookings()
        {
            return _booking.Find(booking => true).ToList();
        }

        // remove booking using id
        public void Remove(string id)
        {
            _booking.DeleteOne(booking => booking.Id == id);
        }

        // update booking using id
        public void Update(string id, Booking booking)
        {
            _booking.ReplaceOne(booking => booking.Id == id, booking);
        }

        // update booking active status
        public void UpdateActiveStatus(string id, bool active)
        {
            var filter = Builders<Booking>.Filter.Eq("Id", id);
            var update = Builders<Booking>.Update.Set("Active", active);
            _booking.UpdateOne(filter, update);
        }

        public object GetBookingsByUser(string nIC)
        {
            return _booking.Find(booking => booking.NIC == nIC).ToList();
        }
    }

}
