using ChepuPizza.BLL.DTO;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;
using ChepuPizza.DAL.Repositories;

namespace ChepuPizza.BLL.Interfaces
{
    public class IngredientService : IIngredientService
    {
        private readonly IIngredientRepository _ingredientRepository;

        public IngredientService(IIngredientRepository ingredientRepository)
        {
            _ingredientRepository = ingredientRepository;
        }

        public async Task<List<IngredientResponse>> GetAllAsync()
        {
            List<Ingredient> ingredients = await _ingredientRepository.GetAllAsync();
            List<IngredientResponse> ingredientDtos = new();

            foreach(Ingredient ingredient in ingredients)
            {
                IngredientResponse ingredientDto = new IngredientResponse
                {
                    Id = ingredient.Id,
                    Name = ingredient.Name,
                    Price = ingredient.Price,
                    IsAvailable = ingredient.IsAvailable,
                    Category = ingredient.Category.ToString(),
                    ImageUrl = ingredient.ImageUrl
                };

                ingredientDtos.Add(ingredientDto);
            }
            return ingredientDtos;
        }
        public async Task<IngredientResponse?> GetByIdAsync(int ingredientId)
        {
            Ingredient ingredient = await _ingredientRepository.GetByIdAsync(ingredientId);

            if(ingredient == null)
            {
                return null;
            }

            IngredientResponse ingredientDto = new IngredientResponse
            {
                Id = ingredient.Id,
                Name = ingredient.Name,
                Price = ingredient.Price,
                IsAvailable = ingredient.IsAvailable,
                Category = ingredient.Category.ToString(),
                ImageUrl = ingredient.ImageUrl
            };
            return ingredientDto;
        }
    }
}
