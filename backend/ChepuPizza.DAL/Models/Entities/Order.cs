namespace ChepuPizza.DAL.Models.Entities
{
    public class Order
    {
        private Order() { } // EF Core

        public int Id { get; private set; }

        public string CustomerName { get; private set; } = string.Empty;

        public string Phone { get; private set; } = string.Empty;

        public string Address { get; private set; } = string.Empty;

        public string? Comment { get; private set; }

        public decimal TotalPrice { get; private set; }

        public OrderStatus Status { get; private set; }

        public DateTime CreatedAt { get; private set; }

        public List<OrderItem> Items { get; private set; } = new();
    }
    public enum OrderStatus
    {
        Created,
        Cooking,
        Ready,
        Delivered,
        Cancelled
    }

    public class OrderItem
    {
        public int Id { get; private set; }

        public int OrderId { get; private set; }

        public Order Order { get; private set; } = null!;

        public string PizzaName { get; private set; } = string.Empty;

        public decimal UnitPrice { get; private set; }

        public int Quantity { get; private set; }

        public List<OrderItemIngredient> Ingredients { get; private set; } = new();
    }

    public class OrderItemIngredient
    {
        public int OrderItemId { get; set; }

        public OrderItem OrderItem { get; set; } = null!;

        public int IngredientId { get; set; }

        public Ingredient Ingredient { get; set; } = null!;
    }
}
