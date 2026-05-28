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
            List<Ingredient> ingredient = await _ingredientRepository.GetAllAsync();
            List<IngredientResponse> cheesesDto = new List<IngredientResponse>();

            foreach(Ingredient cheese in ingredient)
            {
                IngredientResponse ingredientDto = new IngredientResponse();

                ingredientDto.Id = cheese.Id;
                ingredientDto.Name = cheese.Name;
                ingredientDto.Price = cheese.Price;
                ingredientDto.IsAvailable = cheese.IsAvailable;
                ingredientDto.Category = cheese.Category;
                ingredientDto.ImageUrl = cheese.ImageUrl;
                

                cheesesDto.Add(ingredientDto);
            }
            return cheesesDto;
        }
        public async Task<IngredientResponse> GetByIdAsync(int ingredientId)
        {
            Ingredient cheese = await _ingredientRepository.GetByIdAsync(ingredientId);
            IngredientResponse ingredientDto = new IngredientResponse();

            ingredientDto.Id = cheese.Id;
            ingredientDto.Name = cheese.Name;
            ingredientDto.Price = cheese.Price;
            ingredientDto.IsAvailable = cheese.IsAvailable;
            ingredientDto.Category = cheese.Category;
            ingredientDto.ImageUrl = cheese.ImageUrl;

            return ingredientDto;
        }
    }
}
