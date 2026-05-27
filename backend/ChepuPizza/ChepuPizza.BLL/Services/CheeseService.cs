using ChepuPizza.BLL.DTO;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;
using ChepuPizza.DAL.Repositories;

namespace ChepuPizza.BLL.Interfaces
{
    public class CheeseService : ICheeseService
    {
        private readonly ICheeseRepository _cheeseRepository;

        public CheeseService(ICheeseRepository cheeseRepository)
        {
            _cheeseRepository = cheeseRepository;
        }

        public async Task<List<CheeseResponse>> GetAllAsync()
        {
            List<Cheese> cheeses = await _cheeseRepository.GetAllAsync();
            List<CheeseResponse> cheesesDto = new List<CheeseResponse>();

            foreach(Cheese cheese in cheeses)
            {
                CheeseResponse cheeseDto = new CheeseResponse();

                cheeseDto.Id = cheese.Id;
                cheeseDto.Name = cheese.Name;
                cheeseDto.Price = cheese.Price;
                cheeseDto.IsAvailable = cheese.IsAvailable;
                cheeseDto.Pizzas = cheese.Pizzas;

                cheesesDto.Add(cheeseDto);
            }
            return cheesesDto;
        }
        public async Task<CheeseResponse> GetByIdAsync(int cheeseId)
        {
            Cheese cheese = await _cheeseRepository.GetByIdAsync(cheeseId);
            CheeseResponse cheeseDto = new CheeseResponse();

            cheeseDto.Id = cheese.Id;
            cheeseDto.Name = cheese.Name;
            cheeseDto.Price = cheese.Price;
            cheeseDto.IsAvailable = cheese.IsAvailable;
            cheeseDto.Pizzas = cheese.Pizzas;

            return cheeseDto;
        }
    }
}
