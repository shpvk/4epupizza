using ChepuPizza.BLL.DTO;

namespace ChepuPizza.BLL.Services
{
    public class OrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }




        public async Task<OrderResponse> CreateAsync(OrderRequest request)
        {

        }
    }
}
