using ChepuPizza.BLL.DTO;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;

namespace ChepuPizza.BLL.Services
{
    public class OrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<OrderResponse> CreateAsync(OrderRequest requestDto)
        {
            // OrderRequest requestDto --> Order request
            Order order = Order.Create(requestDto.Id, )



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
                    TotalPrice = orderItem.TotalPrice,
                    Ingredients = orderItem.Ingredients.Select(ingredient => new IngredientResponse
                    {
                        Id = ingredient.Id,
                        Name = ingredient.Name,
                        Price = ingredient.Price,
                        IsAvailable = ingredient.IsAvailable,
                        ImageUrl = ingredient.ImageUrl,
                        Category = ingredient.Category.ToString()
                    }).ToList()
                }).ToList()
            };

            return orderDto;
        }
    }
}
