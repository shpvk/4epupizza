using ChepuPizza.BLL.DTO;
using ChepuPizza.BLL.Interfaces;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;

namespace ChepuPizza.BLL.Services
{
    public class PizzaBuilderService : IPizzaBuilderService
    {
        private readonly IIngredientRepository _ingredientRepository;

        public PizzaBuilderService(IIngredientRepository ingredientRepository)
        {
            _ingredientRepository = ingredientRepository;
        }


        public async Task<PizzaBuilderResponse> CalculateAsync(PizzaBuilderRequest request)
        {
            if (request.IngredientIds.Count() == 0)
            {
                throw new Exception("Choose at least one ingredient");
            }

            List<int> ingredientIds = request.IngredientIds.Distinct().ToList();
            List<Ingredient> ingredients = await _ingredientRepository.GetByIdsAsync(ingredientIds);

            if(ingredients.Count != ingredientIds.Count)
            {
                throw new ArgumentException("Some ingredients were not found");
            }

            PizzaBuilderResponse response = new();

            decimal totalPrice = 0;

            foreach(Ingredient ingredient in ingredients)
            {
                IngredientResponse ingredientResponse = new();
                ingredientResponse.Price = ingredient.Price;
                totalPrice += ingredientResponse.Price;

                ingredientResponse.Name = ingredient.Name;
                ingredientResponse.IsAvailable = ingredient.IsAvailable;
                ingredientResponse.ImageUrl = ingredient.ImageUrl;
                ingredientResponse.Category = ingredient.Category.ToString();

                response.Ingredients.Add(ingredientResponse);
            }
            response.TotalPrice = totalPrice;
            return response;
        }
    }
}
