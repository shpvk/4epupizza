namespace ChepuPizza.BLL.DTO
{
    public class PizzaRequest
    {
        public string Name { get; set; } = null!;
        public decimal Price { get; set; } = 0;
        public List<int> IngredientIds { get; set; } = new();
    }
}
