using ChepuPizza.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;

namespace ChepuPizza.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PizzaController : ControllerBase
    {
        public readonly IPizzaService _pizzaService;

        public PizzaController(IPizzaService pizzaService)
        {
            _pizzaService = pizzaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            {
                var pizzas = await _pizzaService.GetAllAsync();
                return Ok(pizzas);
            }
        }
    }
}
