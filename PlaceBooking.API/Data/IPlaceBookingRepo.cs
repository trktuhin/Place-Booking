using System.Threading.Tasks;

namespace PlaceBooking.API.Data
{
    public interface IPlaceBookingRepo
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
    }
}