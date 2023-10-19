

using TicketReservationSystem.Model;

namespace TicketReservationSystem.Service
{
  /**
    * booking service interface
    * **/
  public interface IBookingService
  {
    // get all booking in the collection
    List<BookingRequestDto> GetBookings();
    // get booking using id
    BookingRequestDto Get(String id);
    // create booking
    Booking Create(Booking booking);
    // get user using username
    Booking GetBookingbyformStation(string fromStation);
    // update booking using id
    void Update(String id, Booking booking);
    // remove booking using id
    void Remove(String id);
    object GetBookingsByUser(string nIC);
  }
}
