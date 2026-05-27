using ChepuPizza.BLL.DTO;
using ChepuPizza.DAL.Models.Entities;

namespace ChepuPizza.BLL.Interfaces
{
    public interface ICheeseService
    {
        Task<List<CheeseResponse>> GetAllAsync();
        Task<CheeseResponse> GetByIdAsync(int cheeseId);
    }
}
