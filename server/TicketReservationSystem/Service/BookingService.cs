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
        private readonly IUserService userService;
        private readonly IScheduleService scheduleService;

        //constructor 
        public BookingService(IDatabaseSettings settings, IMongoClient mongoClient, IUserService userService, IScheduleService scheduleService)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _booking = database.GetCollection<Booking>(settings.BookingCollectionName);
            this.userService = userService;
            this.scheduleService = scheduleService;
        }

        // create booking 
        public Booking Create(Booking booking)
        {
            _booking.InsertOne(booking);
            return booking;
        }

        // get booking using id
        public BookingRequestDto Get(string id)
        {
            Booking booking = _booking.Find(booking => booking.Id == id).FirstOrDefault();
            // get user using booking NIC
            var user = userService.Get(booking.NIC);
            // get schedule using booking schedule id
            var schedule = scheduleService.Get(booking.scheduleId);

            BookingRequestDto bookingRequestDto = new BookingRequestDto();
            bookingRequestDto.Id = booking.Id;
            bookingRequestDto.fromStation = booking.fromStation;
            bookingRequestDto.toStation = booking.toStation;
            bookingRequestDto.journeyDate = booking.journeyDate;
            bookingRequestDto.noOfTickets = booking.noOfTickets;
            bookingRequestDto.ticketclass = booking.ticketclass;
            bookingRequestDto.user = new UserObjectRequest(user);
            bookingRequestDto.schedule = new ScheduleObjectRequest();

            bookingRequestDto.schedule.Id = schedule.Id;
            bookingRequestDto.schedule.Train = schedule.Train;
            bookingRequestDto.schedule.TrainClassName = schedule.TrainClassName;
            bookingRequestDto.schedule.StartLocation = schedule.StartLocation;
            bookingRequestDto.schedule.EndLocation = schedule.EndLocation;
            bookingRequestDto.schedule.DepartureTime = schedule.DepartureTime;
            bookingRequestDto.schedule.ArrivalTime = schedule.ArrivalTime;
            bookingRequestDto.schedule.Status = schedule.Status;


            return bookingRequestDto;
        }

        // get booking using booking name
        public Booking GetBookingbyformStation(string fromStation)
        {
            return _booking.Find(booking => booking.fromStation == fromStation).FirstOrDefault();
        }

        // get all booking in the collection
        public List<BookingRequestDto> GetBookings()
        {
            List<BookingRequestDto> bookingRequestDtos = new List<BookingRequestDto>();
            var bookings = _booking.Find(booking => true).ToList();
            foreach (var booking in bookings)
            {
                // get user using booking NIC
                var user = userService.Get(booking.NIC);
                // get schedule using booking schedule id
                var schedule = scheduleService.Get(booking.scheduleId);

                BookingRequestDto bookingRequestDto = new BookingRequestDto();
                bookingRequestDto.Id = booking.Id;
                bookingRequestDto.fromStation = booking.fromStation;
                bookingRequestDto.toStation = booking.toStation;
                bookingRequestDto.journeyDate = booking.journeyDate;
                bookingRequestDto.noOfTickets = booking.noOfTickets;
                bookingRequestDto.ticketclass = booking.ticketclass;
                bookingRequestDto.user = new UserObjectRequest(user);
                bookingRequestDto.schedule = new ScheduleObjectRequest();

                bookingRequestDto.schedule.Id = schedule.Id;
                bookingRequestDto.schedule.Train = schedule.Train;
                bookingRequestDto.schedule.TrainClassName = schedule.TrainClassName;
                bookingRequestDto.schedule.StartLocation = schedule.StartLocation;
                bookingRequestDto.schedule.EndLocation = schedule.EndLocation;
                bookingRequestDto.schedule.DepartureTime = schedule.DepartureTime;
                bookingRequestDto.schedule.ArrivalTime = schedule.ArrivalTime;
                bookingRequestDto.schedule.Status = schedule.Status;

                bookingRequestDtos.Add(bookingRequestDto);
            }
            return bookingRequestDtos;
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
