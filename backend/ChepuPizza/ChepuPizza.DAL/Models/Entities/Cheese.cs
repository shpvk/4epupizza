namespace ChepuPizza.DAL.Models.Entities
{
    public class Cheese
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        //public string ImageUrl { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; } = true;
        public List<Pizza> Pizzas { get; set; } = new();
    }
}
