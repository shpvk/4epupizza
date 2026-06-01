using Microsoft.AspNetCore.Mvc;

namespace ChepuPizza.API.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
    }
}
