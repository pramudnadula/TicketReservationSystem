using MongoDB.Driver;
using TicketReservationSystem.Model;

namespace TicketReservationSystem.Service
{
    /** 
     * schedule service class
     * **/
    public class ScheduleService : IScheduleService
    {
        // veriable for hold mongo colllection
        private readonly IMongoCollection<Schedule> _schedule;
        private readonly ITrainService trainService;

        //constructor 
        public ScheduleService(IDatabaseSettings settings, IMongoClient mongoClient, ITrainService trainService)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _schedule = database.GetCollection<Schedule>(settings.ScheduleCollectionName);
            this.trainService = trainService;
        }

        // create user 
        public Schedule Create(Schedule schedule)
        {
            _schedule.InsertOne(schedule);
            return schedule;
        }

        // get user using id
        public ScheduleObjectRequest Get(string id)
        {
            Schedule schedule = _schedule.Find(schedule => schedule.Id == id).FirstOrDefault();
            Train train = trainService.Get(schedule.TrainName);
            ScheduleObjectRequest scheduleObjectRequest = new ScheduleObjectRequest();
            scheduleObjectRequest.Id = schedule.Id;
            scheduleObjectRequest.Train = train;
            scheduleObjectRequest.TrainClassName = schedule.TrainClassName;
            scheduleObjectRequest.StartLocation = schedule.StartLocation;
            scheduleObjectRequest.EndLocation = schedule.EndLocation;
            scheduleObjectRequest.DepartureTime = schedule.DepartureTime;
            scheduleObjectRequest.ArrivalTime = schedule.ArrivalTime;
            scheduleObjectRequest.Status = schedule.Status;
            return scheduleObjectRequest;
        }

        // get user using scheduleName
        public Schedule GetScheduleByScheduleName(string trainName)
        {
            return _schedule.Find(schedule => schedule.TrainName == trainName).FirstOrDefault();
        }

        // get all user in the collection
        public List<ScheduleObjectRequest> GetSchedule()
        {
            List<ScheduleObjectRequest> scheduleObjectRequests = new List<ScheduleObjectRequest>();
            var schedules = _schedule.Find(schedule => true).ToList();
            foreach (var schedule in schedules)
            {
                Train train = trainService.Get(schedule.TrainName);
                ScheduleObjectRequest scheduleObjectRequest = new ScheduleObjectRequest();
                scheduleObjectRequest.Id = schedule.Id;
                scheduleObjectRequest.Train = train;
                scheduleObjectRequest.TrainClassName = schedule.TrainClassName;
                scheduleObjectRequest.StartLocation = schedule.StartLocation;
                scheduleObjectRequest.EndLocation = schedule.EndLocation;
                scheduleObjectRequest.DepartureTime = schedule.DepartureTime;
                scheduleObjectRequest.ArrivalTime = schedule.ArrivalTime;
                scheduleObjectRequest.Status = schedule.Status;
                scheduleObjectRequests.Add(scheduleObjectRequest);
            }
            return scheduleObjectRequests;
        }

        // remove schedule using id
        public void Remove(string id)
        {
            _schedule.DeleteOne(schedule => schedule.Id == id);
        }

        // update trin using id
        public void Update(string id, Schedule schedule)
        {
            _schedule.ReplaceOne(schedule => schedule.Id == id, schedule);
        }


    }

}
