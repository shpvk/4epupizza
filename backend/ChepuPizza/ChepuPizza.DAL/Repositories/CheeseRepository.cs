using ChepuPizza.DAL.Data;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChepuPizza.DAL.Repositories
{
    public class CheeseRepository : ICheeseRepository
    {
        private readonly AppDbContext _context;

        public CheeseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Cheese>> GetAllAsync()
        {
            List<Cheese> cheeses = await _context.Cheeses.ToListAsync();
            return cheeses;
        }

        public async Task<Cheese?> GetByIdAsync(int cheeseId)
        {
            Cheese? cheese = await _context.Cheeses.FindAsync(cheeseId);
            if(cheese == null)
            {
                return null;
            }
            return cheese;
        }
    }
}
