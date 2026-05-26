namespace ChepuPizza.DAL.Entities
{
    public class Pizza
    {

        private Pizza(int id, Cheese? cheese, string name, int price)
        {
            Id = id;
            Cheese = cheese;
            Name = name;
            Price = price;
        }

        public int Id { get; set; }
        public Cheese? Cheese { get; set; }

        public string Name { get; set; } = null!;
        public decimal Price { get; set; } = 0;

        public static (Pizza? pizza, string? error) Create(int id, Cheese? cheese, string name, int price)
        {
            if(price < 0)
            {
                return (null, "Price cannot be lower than zero");
            }

            Pizza pizza = new Pizza(id, cheese, name, price);
            return (pizza, null);

        }

    }
}
