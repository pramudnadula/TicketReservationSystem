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

        //constructor 
        public ScheduleService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _schedule = database.GetCollection<Schedule>(settings.ScheduleCollectionName);
        }

        // create user 
        public Schedule Create(Schedule schedule)
        {
            _schedule.InsertOne(schedule);
            return schedule;
        }

        // get user using id
        public Schedule Get(string id)
        {
            return _schedule.Find(schedule => schedule.Id == id).FirstOrDefault();
        }

        // get user using scheduleName
        public Schedule GetScheduleByScheduleName(string trainName)
        {
            return _schedule.Find(schedule => schedule.TrainName == trainName).FirstOrDefault();
        }

        // get all user in the collection
        public List<Schedule> GetSchedule()
        {
            return _schedule.Find(schedule => true).ToList();
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
