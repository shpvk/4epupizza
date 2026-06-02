using ChepuPizza.DAL.Models.Entities;

namespace ChepuPizza.DAL.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> AddAsync(Order order);
    }
}
