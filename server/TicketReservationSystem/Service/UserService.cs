using MongoDB.Driver;
using TicketReservationSystem.Model;

namespace TicketReservationSystem.Service
{
    /** 
     * user service class
     * **/
    public class UserService : IUserService
    {
        // veriable for hold mongo colllection
        private readonly IMongoCollection<User> _user;
        private readonly IMongoCollection<Booking> _booking;

        //constructor 
        public UserService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _user = database.GetCollection<User>(settings.UserCollectionName);
            _booking = database.GetCollection<Booking>(settings.BookingCollectionName);
        }

        // create user 
        public User Create(User user)
        {
            _user.InsertOne(user);
            return user;
        }

        // get user using NIC
        public User Get(string nic)
        {
            return _user.Find(user => user.NIC == nic).FirstOrDefault();
        }

        // get user using Email
        public User GetUserByEmail(string email)
        {
            return _user.Find(user => user.Email == email).FirstOrDefault();
        }

        // get all user in the collection
        public List<User> GetUsers()
        {
            return _user.Find(user => true).ToList();
        }

        // remove user using id
        public void Remove(string nic)
        {
            _user.DeleteOne(user => user.NIC == nic);
        }

        // update user using id
        public void Update(string nic, User user)
        {
            _user.ReplaceOne(user => user.NIC == nic, user);
        }

        // update user active status
        public void UpdateActiveStatus(string nic, bool active)
        {
            var filter = Builders<User>.Filter.Eq("NIC", nic);
            var update = Builders<User>.Update.Set("Active", active);
            _user.UpdateOne(filter, update);
        }

        // check if user nic foreign key is used in other tables
        public bool IsUserForeignKeyUsed(string nic)
        {
            var filter = Builders<Booking>.Filter.Eq("NIC", nic);
            var result = _booking.Find(filter).FirstOrDefault();
            if (result != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
