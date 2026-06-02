using ChepuPizza.DAL.Data;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChepuPizza.DAL.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;

        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Order> AddAsync(Order order)
        {
            Order order = await _context.Orders.AddAsync(order);
        }
    }
}
