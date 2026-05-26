namespace ChepuPizza.DAL.Models.Entities
{
    public class Pizza
    {

        private Pizza(int id, int? cheeseId, string name, decimal price, string imageUrl)
        {
            Id = id;
            CheeseId = cheeseId;
            Name = name;
            Price = price;
            ImageUrl = imageUrl;
        }

        public int Id { get; private set; }
        public Cheese? Cheese { get; private set; }
        public int? CheeseId { get; private set; }

        public string Name { get; private set; } = null!;
        public decimal Price { get; private set; } = 0;

        public string ImageUrl { get; private set; } = string.Empty;
         
        public static (Pizza? pizza, string? error) Create(int id, int cheeseId, string name, decimal price, string imageUrl)
        {
            if(price < 0)
            {
                return (null, "Price cannot be lower than zero");
            }

            Pizza pizza = new Pizza(id, cheeseId, name, price, imageUrl);
            return (pizza, null);

        }

    }
}
