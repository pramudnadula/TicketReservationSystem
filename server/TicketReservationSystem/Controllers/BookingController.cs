using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TicketReservationSystem.Auth;
using TicketReservationSystem.Model;
using TicketReservationSystem.Service;
using System.Security;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TicketReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /**
     * booking controller class
     * **/
    public class BookingController : ControllerBase
    {
        // variable for hold servies interfaces
        private readonly IBookingService bookingService;

        // constructor 
        public BookingController(IBookingService bookingService)
        {
            this.bookingService = bookingService;

        }

        // GET: api/<Booking controller>
        [HttpGet]
        public ActionResult<List<Booking>> Get()
        {
            return bookingService.GetBookings();
        }

        // GET api/<BookingController>/5
        [HttpGet("{id}")]
        public ActionResult<Booking> Get(String id)
        {
            var booking = bookingService.Get(id);
            if (booking == null)
            {
                return NotFound($"booking with id = {id} not found");
            }

            return booking;
        }

        // POST api/<UserController>
        [HttpPost("addBooking")]
        public ActionResult<Booking> AddBooking([FromBody] BookingRequest request)
        {
            if (request.fromStation == null || request.toStation == null || request.journeyDate == null || request.noOfTickets == null || request.ticketclass == null)
            {
                return BadRequest("Fail to add booking");
            }


            Booking booking = new Booking();
            booking.fromStation = request.fromStation;
            booking.toStation = request.toStation;
            booking.journeyDate = request.journeyDate;
            booking.noOfTickets = request.noOfTickets;
            booking.ticketclass = request.ticketclass;


            bookingService.Create(booking);
            return CreatedAtAction(nameof(Get), new { id = booking.Id }, booking);
        }



        // PUT api/<Bookingcontroller>/5
        [HttpPut("{id}")]
        public ActionResult Put(String id, [FromBody] Booking booking)
        {
            var existingBooking = bookingService.Get(id);

            if (existingBooking == null)
            {
                return NotFound($"Booking with id = {id} not found");
            }

            bookingService.Update(id, booking);

            return Ok($"Booking with id = {id} updated");
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(String id)
        {
            var booking = bookingService.Get(id);

            if (booking == null)
            {
                return NotFound($"Booking with id = {id} not found");
            }

            bookingService.Remove(booking.Id);

            return Ok($"Booking with id = {id} deleted");
        }


    }
}
