

using TicketReservationSystem.Model;

namespace TicketReservationSystem.Service
{
  /**
    * user service interface
    * **/
  public interface IUserService
  {
    // get all user in the collection
    List<User> GetUsers();
    // get user using id
    User Get(String id);
    // create user
    User Create(User user);
    // get user using Email
    User GetUserByEmail(string email);
    // update user using id
    void Update(String id, User user);
    // remove user using id
    void Remove(String id);
    // update active status
    void UpdateActiveStatus(String id, bool active);
    // check if user nic foreign key is used in other tables
    bool IsUserForeignKeyUsed(String nic);

  }
}
