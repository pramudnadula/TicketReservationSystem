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
        // variable for hold Service interfaces
        private readonly ITrainService trainService;

        // constructor 
        public TrainController(ITrainService trainService)
        {
            this.trainService = trainService;
        }

        // GET: api/<TrainController>
        [HttpGet]
        public ActionResult<List<Train>> Get()
        {
            return trainService.GetTrain();
        }

        // GET api/<TrainController>/5
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

        // POST api/<TrainController>
        [HttpPost("create")]
        public ActionResult<Train> TarinCreate([FromBody] TrainRequest request)
        {
            if (request.TrainName == null)
            {
                return BadRequest("TrainName is required");
            }


            Train train = new Train();
            train.TrainName = request.TrainName;
            train.Status = request.Status;


            trainService.Create(train);
            return CreatedAtAction(nameof(Get), new { id = train.Id }, train);
        }



        // PUT api/<TrainController>/5
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

        // DELETE api/<TrainController>/5
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

        //UPDATE active status
        [HttpPut("active/{id}")]
        public ActionResult UpdateStatus(String id, bool active)
        {
            var existingTrain = trainService.Get(id);

            if (existingTrain == null)
            {
                return NotFound($"Train with id = {id} not found");
            }

            trainService.UpdateStatus(id, active);

            if (active)
            {
                return Ok($"Train with id = {id} activated");
            }
            else
            {
                return Ok($"Train with id = {id} deactivated");
            }

        }
    }
}
