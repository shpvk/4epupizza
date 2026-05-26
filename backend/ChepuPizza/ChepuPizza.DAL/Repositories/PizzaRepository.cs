using ChepuPizza.DAL.Data;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChepuPizza.DAL.Repositories
{
    public class PizzaRepository : IPizzaRepository
    {
        private readonly AppDbContext _context;

        public PizzaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Pizza>> GetAllAsync()
        {
            List<Pizza> pizzas = await _context.Pizzas.ToListAsync();
            return pizzas;
        }
    }
}
