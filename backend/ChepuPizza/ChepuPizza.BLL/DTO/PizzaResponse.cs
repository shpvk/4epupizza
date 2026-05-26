namespace ChepuPizza.BLL.DTO
{
    public class PizzaResponse
    {
        public int Id { get; set; }
        public int? CheeseId { get; set; }

        public string Name { get; set; } = null!;
        public decimal Price { get; set; } = 0;
    }
}
