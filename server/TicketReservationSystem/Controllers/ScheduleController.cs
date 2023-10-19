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
     * schedule controller class
     * **/
    public class ScheduleController : ControllerBase
    {
        // variable for hold Service interfaces
        private readonly IScheduleService scheduleService;

        // constructor 
        public ScheduleController(IScheduleService scheduleService)
        {
            this.scheduleService = scheduleService;
        }

        // GET: api/<UserController>
        [HttpGet]
        public ActionResult<List<ScheduleObjectRequest>> Get()
        {
            return scheduleService.GetSchedule();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public ActionResult<ScheduleObjectRequest> Get(String id)
        {
            var schedule = scheduleService.Get(id);
            if (schedule == null)
            {
                return NotFound($"schedule with id = {id} not found");
            }

            return schedule;
        }

        // POST api/<UserController>
        [HttpPost("create")]
        public ActionResult<Schedule> Registration([FromBody] ScheduleRequest request)
        {
            if (request.TrainName == null || request.TrainClassName == null || request.StartLocation == null || request.EndLocation == null || request.DepartureTime == null || request.ArrivalTime == null)
            {
                return BadRequest("Fail to create");
            }


            Schedule schedule = new Schedule();
            schedule.TrainName = request.TrainName;
            schedule.TrainClassName = request.TrainClassName;
            schedule.StartLocation = request.StartLocation;
            schedule.EndLocation = request.EndLocation;
            schedule.DepartureTime = request.DepartureTime;
            schedule.ArrivalTime = request.ArrivalTime;
            schedule.Status = request.Status;


            scheduleService.Create(schedule);
            return CreatedAtAction(nameof(Get), new { id = schedule.Id }, schedule);
        }



        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public ActionResult Put(String id, [FromBody] Schedule schedule)
        {
            var existingTrain = scheduleService.Get(id);

            if (existingTrain == null)
            {
                return NotFound($"schedule with id = {id} not found");
            }

            scheduleService.Update(id, schedule);

            return Ok($"schedule with id = {id} updated");
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(String id)
        {
            var schedule = scheduleService.Get(id);

            if (schedule == null)
            {
                return NotFound($"schedule with id = {id} not found");
            }

            scheduleService.Remove(schedule.Id);

            return Ok($"Student with id = {id} deleted");
        }

        // //UPDATE active status
        // [HttpPut("active/{id}")]
        // public ActionResult UpdateActiveStatus(String id, [FromBody] Schedule schedule)
        // {
        //     var existingTrain = scheduleService.Get(id);

        //     if (existingTrain == null)
        //     {
        //         return NotFound($"Schedule with id = {id} not found");
        //     }

        //     scheduleService.UpdateActiveStatus(id, schedule.Active);

        //     return NoContent();
        // }
    }
}
