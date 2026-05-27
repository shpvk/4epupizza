using ChepuPizza.BLL.Interfaces;
using ChepuPizza.DAL.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Runtime.InteropServices;

namespace ChepuPizza.API.Controllers
{
    [ApiController]
    [Route("api/pizzas")]
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
            var pizzas = await _pizzaService.GetAllAsync();
            return Ok(pizzas);
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int pizzaId)
        {
            var pizza = await _pizzaService.GetByIdAsync(pizzaId);
            return Ok(pizza);
        }
    }
}
