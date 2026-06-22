using ChepuPizza.BLL.DTO;
using ChepuPizza.BLL.Interfaces;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;

namespace ChepuPizza.BLL.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IPizzaRepository _pizzaRepository;
        private readonly IIngredientRepository _ingredientRepository;

        public OrderService(IOrderRepository orderRepository, IPizzaRepository pizzaRepository,
            IIngredientRepository ingredientRepository)
        {
            _orderRepository = orderRepository;
            _pizzaRepository = pizzaRepository;
            _ingredientRepository = ingredientRepository;
        }

        public async Task<OrderResponse> CreateAsync(OrderRequest requestDto)
        {
            if (requestDto.Items == null || requestDto.Items.Count == 0)
                throw new ArgumentException("Order must contain at least one item");

            List<OrderItem> orderItems = new();

            foreach (OrderItemRequest itemDto in requestDto.Items)
            {
                if(itemDto.Quantity <= 0)
                {
                    throw new Exception("Quantity must be more than zero");
                }

                if(itemDto.PizzaId != null) // Generic pizza
                {
                    Pizza? pizza = await _pizzaRepository.GetByIdAsync(itemDto.PizzaId.Value);
                    List<Ingredient> ingredients = pizza.PizzaIngredients
                        .Select(pi => pi.Ingredient)
                        .ToList();

                    (OrderItem? orderItem, string? error) = OrderItem.Create(pizza.Name, pizza.Id, itemDto.Quantity,
                        pizza.Price, ingredients);

                    if(orderItem == null)
                    {
                        throw new Exception(error);
                    }
                    orderItems.Add(orderItem);
                }
                if(itemDto.PizzaId == null) // Custom pizza
                {
                    List<int> ingredientIds = itemDto.IngredientIds;
                    List<Ingredient> ingredients = await _ingredientRepository.GetByIdsAsync(ingredientIds);

                    decimal unitPrice = 0;
                    foreach (Ingredient ingredient in ingredients)
                    {
                        unitPrice += ingredient.Price;
                        (OrderItem? orderItem, string? error) = OrderItem.Create(
                            "Custom Pizza",
                            null,
                            itemDto.Quantity,
                            unitPrice,
                            ingredients
                        );
                        if (orderItem != null)
                            orderItems.Add(orderItem);
                    }
                }
            }

            var result = Order.Create(
                requestDto.CustomerName,
                requestDto.Phone,
                requestDto.Address,
                requestDto.Comment,
                orderItems
            );

            if (result.error != null)
                throw new ArgumentException(result.error);

            Order order = result.order!;

            await _orderRepository.CreateAsync(order);

            OrderResponse orderDto = new OrderResponse
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Phone = order.Phone,
                Address = order.Address,
                TotalPrice = order.TotalPrice,
                Status = order.Status.ToString(),
                CreatedAt = order.CreatedAt,

                Items = order.OrderItems.Select(orderItem => new OrderItemResponse
                {
                    Id = orderItem.Id,
                    PizzaName = orderItem.PizzaName,
                    Quantity = orderItem.Quantity,
                    UnitPrice = orderItem.UnitPrice,
                    TotalPrice = orderItem.TotalPrice
                }).ToList()
            };

            return orderDto;
        }
    }
}
