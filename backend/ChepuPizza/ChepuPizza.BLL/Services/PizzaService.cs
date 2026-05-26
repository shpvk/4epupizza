using ChepuPizza.BLL.DTO;
using ChepuPizza.BLL.Interfaces;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;
using System.Runtime.CompilerServices;

namespace ChepuPizza.BLL.Services
{
    public class PizzaService : IPizzaService
    {
        private readonly IPizzaRepository _pizzaRepository;

        public PizzaService(IPizzaRepository pizzaRepository)
        {
            _pizzaRepository = pizzaRepository;
        }

        public async Task<List<PizzaResponse>> GetAllAsync()
        {
            List<Pizza> pizzas = await _pizzaRepository.GetAllAsync();
            List<PizzaResponse> pizzasDto = new List<PizzaResponse>();

            foreach(Pizza pizza in pizzas)
            {
                PizzaResponse pizzaResponse = new PizzaResponse();
                pizzaResponse.Id = pizza.Id;
                pizzaResponse.Price = pizza.Price;
                pizzaResponse.CheeseId = pizza.CheeseId;
                pizzaResponse.Name = pizza.Name;
                pizzasDto.Add(pizzaResponse);
            }
            return pizzasDto;
        }
    }
}
