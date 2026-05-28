namespace ChepuPizza.BLL.DTO
{
    public class PizzaRequest
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; } = 0;
    }
}
