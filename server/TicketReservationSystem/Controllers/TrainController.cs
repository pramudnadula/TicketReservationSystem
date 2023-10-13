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
     * train controller class
     * **/
    public class TrainController : ControllerBase
    {
        // variable for hold servies interfaces
        private readonly ITrainService trainService;

        // constructor 
        public TrainController(ITrainService trainService)
        {
            this.trainService = trainService;


        }

        // GET: api/<UserController>
        [HttpGet]
        public ActionResult<List<Train>> Get()
        {
            return trainService.GetTrain();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public ActionResult<Train> Get(String id)
        {
            var train = trainService.Get(id);
            if (train == null)
            {
                return NotFound($"train with id = {id} not found");
            }

            return train;
        }

        // POST api/<UserController>
        [HttpPost("create")]
        public ActionResult<Train> Registration([FromBody] TrainRequest request)
        {
            if (request.TrainName == null || request.StartLocation == null || request.EndLocation == null || request.DepartureTime == null || request.ArrivalTime == null)
            {
                return BadRequest("Fail to create");
            }


            Train train = new Train();
            train.TrainName = request.TrainName;
            train.StartLocation = request.StartLocation;
            train.EndLocation = request.EndLocation;
            train.DepartureTime = request.DepartureTime;
            train.ArrivalTime = request.ArrivalTime;


            trainService.Create(train);
            return CreatedAtAction(nameof(Get), new { id = train.Id }, train);
        }



        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public ActionResult Put(String id, [FromBody] Train train)
        {
            var existingTrain = trainService.Get(id);

            if (existingTrain == null)
            {
                return NotFound($"train with id = {id} not found");
            }

            trainService.Update(id, train);

            return Ok($"train with id = {id} updated");
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(String id)
        {
            var train = trainService.Get(id);

            if (train == null)
            {
                return NotFound($"train with id = {id} not found");
            }

            trainService.Remove(train.Id);

            return Ok($"Student with id = {id} deleted");
        }

        // //UPDATE active status
        // [HttpPut("active/{id}")]
        // public ActionResult UpdateActiveStatus(String id, [FromBody] Train train)
        // {
        //     var existingTrain = trainService.Get(id);

        //     if (existingTrain == null)
        //     {
        //         return NotFound($"Train with id = {id} not found");
        //     }

        //     trainService.UpdateActiveStatus(id, train.Active);

        //     return NoContent();
        // }
    }
}
