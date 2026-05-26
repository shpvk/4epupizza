namespace ChepuPizza.DAL.Models.Entities
{
    public class Pizza
    {

        private Pizza(int id, int? cheeseId, string name, decimal price)
        {
            Id = id;
            CheeseId = cheeseId;
            Name = name;
            Price = price;
        }

        public int Id { get; set; }
        public Cheese? Cheese { get; set; }
        public int? CheeseId { get; set; }

        public string Name { get; set; } = null!;
        public decimal Price { get; set; } = 0;


        public static (Pizza? pizza, string? error) Create(int id, int cheeseId, string name, decimal price)
        {
            if(price < 0)
            {
                return (null, "Price cannot be lower than zero");
            }

            Pizza pizza = new Pizza(id, cheeseId, name, price);
            return (pizza, null);

        }

    }
}
