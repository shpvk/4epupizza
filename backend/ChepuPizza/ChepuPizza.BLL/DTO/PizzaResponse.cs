namespace ChepuPizza.BLL.DTO
{
    public class PizzaResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; } = 0;
        public string ImageUrl { get; set; } = string.Empty;
    }
}

