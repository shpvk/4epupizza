namespace ChepuPizza.DAL.Models.Entities
{
    public class Pizza
    {
        private Pizza()
        {
            // For EF Core
        }

        private Pizza(int id, string name, decimal price, string imageUrl)
        {
            Id = id;
            Name = name;
            Price = price;
            ImageUrl = imageUrl;
        }

        public int Id { get; private set; }

        public string Name { get; private set; } = string.Empty;

        public decimal Price { get; private set; }

        public string ImageUrl { get; private set; } = string.Empty;

        public bool IsAvailable { get; private set; } = true;

        public static (Pizza? pizza, string? error) Create(
            int id,
            string name,
            decimal price,
            string imageUrl)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return (null, "Name cannot be empty");
            }

            if (price < 0)
            {
                return (null, "Price cannot be lower than zero");
            }

            if (string.IsNullOrWhiteSpace(imageUrl))
            {
                return (null, "ImageUrl cannot be empty");
            }

            Pizza pizza = new Pizza(id, name, price, imageUrl);

            return (pizza, null);
        }
    }
}