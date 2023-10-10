

using TicketReservationSystem.Model;

namespace TicketReservationSystem.Service
{
    /**
      * train service interface
      * **/
    public interface ITrainService
    {
        // get all train in the collection
        List<Train> GetTrain();
        // get train using id
        Train Get(String id);
        // create train
        Train Create(Train train);
        // get train using trainname
        Train GetTrainByTrainname(string trainname);
        // update train using id
        void Update(String id, Train train);
        // remove train using id
        void Remove(String id);

          // update publis status
        // void UpdatePublish(String id, bool status);
        
    }
}
