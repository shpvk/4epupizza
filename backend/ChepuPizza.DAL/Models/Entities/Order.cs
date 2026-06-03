using System;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Text;

namespace ChepuPizza.DAL.Models.Entities
{
    public class Order
    {
        private Order() 
        {
            // For Ef core
        }

        private Order(int id, string customerName, string phone, string address, string? comment,
            decimal totalPrice, OrderStatus status, DateTime createdAt, List<OrderItem> orderItems) 
        {
            Id = id;
            CustomerName = customerName;
            Phone = phone;
            Address = address;
            Comment = comment;
            TotalPrice = totalPrice;
            Status = status;
            CreatedAt = createdAt;
            OrderItems = orderItems;
        }

        public int Id { get; private set; }
        public string CustomerName { get; private set; } = string.Empty;
        public string Phone { get; private set; } = null!;
        public string Address { get; private set; } = null!;
        public string? Comment { get; private set; } = string.Empty;
        public decimal TotalPrice { get; private set; }
        public OrderStatus Status { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public List<OrderItem> OrderItems { get; private set; } = null!;

        public static (Order? order, string? error) Create(int id, string customerName, string phone, string address, 
            string? comment, decimal totalPrice, OrderStatus status, DateTime createdAt, List<OrderItem> orderItems)

        {
            if (string.IsNullOrWhiteSpace(customerName))
                return (null, "Customer name cannot be empty");

            if (string.IsNullOrWhiteSpace(phone))
                return (null, "Phone cannot be empty");

            if (string.IsNullOrWhiteSpace(address))
                return (null, "Address cannot be empty");

            if (totalPrice < 0)
                return (null, "Total price cannot be lower than zero");

            if (createdAt == default)
                return (null, "Created date is invalid");

            if (orderItems == null || orderItems.Count == 0)
                return (null, "Order must contain at least one item");

            if (!Enum.IsDefined(typeof(OrderStatus), status))
                return (null, "Invalid order status");


            Order order = new Order(id, customerName, phone, address, comment, totalPrice, 
                status, createdAt, orderItems);
            return (order, null);
        }
    }
    public class OrderItem
    {

        public int Id { get; private set; }
        public int OrderId { get; private set; }
        public Order Order { get; private set; } = null!;
        public int? PizzaId { get; private set; }
        public string PizzaName { get; private set; } = string.Empty;
        public int Quantity { get; private set; }
        public decimal UnitPrice { get; private set; }
        public decimal TotalPrice { get; private set; }
        public List<Ingredient> Ingredients { get; private set; } = null!;


    }

    public enum OrderStatus
    {
        Created = 1,
        Accepted = 2,
        Cooking = 3,
        Ready = 4,
        Delivered = 5,
        Cancelled = 6
    }

}
