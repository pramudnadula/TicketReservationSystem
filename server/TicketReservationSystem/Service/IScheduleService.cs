

using TicketReservationSystem.Model;

namespace TicketReservationSystem.Service
{
  /**
    * train service interface
    * **/
  public interface IScheduleService
  {
    // get all train in the collection
    List<ScheduleObjectRequest> GetSchedule();
    // get train using id
    ScheduleObjectRequest Get(String id);
    // create train
    Schedule Create(Schedule train);
    // get train using trainname
    Schedule GetScheduleByScheduleName(string trainName);
    // update train using id
    void Update(String id, Schedule train);
    // remove train using id
    void Remove(String id);

    // update publis status
    // void UpdatePublish(String id, bool status);

  }
}
