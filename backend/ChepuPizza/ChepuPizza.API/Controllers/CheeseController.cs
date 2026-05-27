using ChepuPizza.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChepuPizza.API.Controllers
{
    [ApiController]
    [Route("api/cheeses")]
    public class CheeseController : ControllerBase
    {
        public readonly ICheeseService _cheeseService;

        public CheeseController(ICheeseService cheeseService)
        {
            _cheeseService = cheeseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pizzas = await _cheeseService.GetAllAsync();
            return Ok(pizzas);
        }

        [HttpGet("{cheeseId:int}")]
        public async Task<IActionResult> GetById(int cheeseId)
        {
            var pizza = await _cheeseService.GetByIdAsync(cheeseId);
            return Ok(pizza);
        }
    }
}
