using MongoDB.Driver;
using TicketReservationSystem.Model;

namespace TicketReservationSystem.Service
{
    /** 
     * train service class
     * **/
    public class TrainService : ITrainService
    {
        // veriable for hold mongo colllection
        private readonly IMongoCollection<Train> _train;

        //constructor 
        public TrainService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _train = database.GetCollection<Train>(settings.TrainCollectionName);
        }

        // create user 
        public Train Create(Train train)
        {
            _train.InsertOne(train);
            return train;
        }

        // get user using id
        public Train Get(string id)
        {
            return _train.Find(train => train.Id == id).FirstOrDefault();
        }

        // get all user in the collection
        public List<Train> GetTrain()
        {
            return _train.Find(train => true).ToList();
        }

        // remove train using id
        public void Remove(string id)
        {
            _train.DeleteOne(train => train.Id == id);
        }

        // update trin using id
        public void Update(string id, Train train)
        {
            _train.ReplaceOne(train => train.Id == id, train);
        }

        public void UpdateStatus(string id, bool status)
        {
            _train.UpdateOne(train => train.Id == id, Builders<Train>.Update.Set("Status", status));
        }
    }

}
