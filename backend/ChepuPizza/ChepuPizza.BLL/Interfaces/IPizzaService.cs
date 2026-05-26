using ChepuPizza.BLL.DTO;

namespace ChepuPizza.BLL.Interfaces
{
    public interface IPizzaService
    {
        Task<List<PizzaResponse>> GetAllAsync();
    }
}
