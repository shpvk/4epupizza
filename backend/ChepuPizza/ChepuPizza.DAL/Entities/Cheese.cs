namespace ChepuPizza.DAL.Entities
{
    public class Cheese
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; } = true;
    }
}
