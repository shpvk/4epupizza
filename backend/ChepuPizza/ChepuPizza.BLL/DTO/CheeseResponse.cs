using ChepuPizza.DAL.Models.Entities;

namespace ChepuPizza.BLL.DTO
{
    public class CheeseResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; } = true;
        public List<Pizza> Pizzas { get; set; } = new();
    }
}
