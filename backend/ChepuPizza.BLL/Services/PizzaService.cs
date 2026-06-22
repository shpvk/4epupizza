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
                PizzaResponse pizzaDto = new PizzaResponse
                {
                    Id = pizza.Id,
                    Name = pizza.Name,
                    Price = pizza.Price,
                    OrderCount = pizza.OrderCount,
                    Category = pizza.Category,
                    Ingredients = pizza.PizzaIngredients.Select(pizzaIngredient => new IngredientResponse
                    {
                        Id = pizzaIngredient.Ingredient.Id,
                        Name = pizzaIngredient.Ingredient.Name,
                        Price = pizzaIngredient.Ingredient.Price,
                        IsAvailable = pizzaIngredient.Ingredient.IsAvailable,
                        Category = pizzaIngredient.Ingredient.Category.ToString(),
                        ImageUrl = pizzaIngredient.Ingredient.ImageUrl
                    }).ToList()
                };
                pizzasDto.Add(pizzaDto);
            }

            return pizzasDto;
        }

        public async Task<PizzaResponse> GetByIdAsync(int pizzaId)
        {
            Pizza? pizza = await _pizzaRepository.GetByIdAsync(pizzaId);

            if (pizza == null)
            {
                throw new Exception("Pizza not found");
            }

            PizzaResponse pizzaDto = new PizzaResponse
            {
                Id = pizza.Id,
                Name = pizza.Name,
                Price = pizza.Price,
                OrderCount = pizza.OrderCount,
                Category = pizza.Category,
                Ingredients = pizza.PizzaIngredients.Select(pizzaIngredient => new IngredientResponse
                {
                    Id = pizzaIngredient.Ingredient.Id,
                    Name = pizzaIngredient.Ingredient.Name,
                    Price = pizzaIngredient.Ingredient.Price,
                    IsAvailable = pizzaIngredient.Ingredient.IsAvailable,
                    Category = pizzaIngredient.Ingredient.Category.ToString(),
                    ImageUrl = pizzaIngredient.Ingredient.ImageUrl
                }).ToList()
            };
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
