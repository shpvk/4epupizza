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
            List<Pizza?> pizzas = await _pizzaRepository.GetAllAsync();
            List<PizzaResponse> pizzasDto = new List<PizzaResponse>();

            foreach(Pizza pizza in pizzas)
            {
                PizzaResponse pizzaResponse = new PizzaResponse();
                pizzaResponse.Id = pizza.Id;
                pizzaResponse.Price = pizza.Price;
                pizzaResponse.Name = pizza.Name;
                pizzasDto.Add(pizzaResponse);
            }
            return pizzasDto;
        }

        public async Task<PizzaResponse> GetByIdAsync(int pizzaId)
        {
            Pizza? pizza = await _pizzaRepository.GetByIdAsync(pizzaId);

            PizzaResponse pizzaDto = new PizzaResponse();
            pizzaDto.Id = pizza.Id;
            pizzaDto.Name = pizza.Name;
            foreach(PizzaIngredient pizzaIngredient in pizza.PizzaIngredients)
            {
                pizzaDto.IngredientIds.Add(pizzaIngredient.IngredientId);
            }
            return pizzaDto;
        }

        public async Task<PizzaResponse> CreateAsync(PizzaRequest pizzaRequest)
        {
            if (pizzaRequest.IngredientIds == null || pizzaRequest.IngredientIds.Count <= 0)
            {
                throw new ArgumentException("Pizza must have at least one ingredient");
            }

            (Pizza? pizza, string? error) = Pizza.Create(pizzaRequest.Name, pizzaRequest.Price);
            if(error != null)
            {
                throw new Exception(error);
            }
            if(pizza == null)
            {
                throw new Exception("Pizza creation failed");
            }



            foreach(int ingredientId in pizzaRequest.IngredientIds)
            {
                pizza.AddIngredientById(ingredientId);
            }


            Pizza responsePizza = await _pizzaRepository.AddAsync(pizza);
            PizzaResponse pizzaDto = new PizzaResponse();
            pizzaDto.Id = responsePizza.Id;
            pizzaDto.Name = responsePizza.Name;
            pizzaDto.Price = responsePizza.Price;

            return pizzaDto;
        }
    }
}
