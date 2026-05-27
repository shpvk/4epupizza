using ChepuPizza.DAL.Models.Entities;

namespace ChepuPizza.DAL.Interfaces
{
    public interface ICheeseRepository
    {
        Task<List<Cheese>> GetAllAsync();
        Task<Cheese?> GetByIdAsync(int cheeseId);
    }
}
