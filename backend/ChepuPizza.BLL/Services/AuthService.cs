using ChepuPizza.BLL.DTO;
using ChepuPizza.BLL.Interfaces;
using ChepuPizza.DAL.Models.Entities;
using Microsoft.EntityFrameworkCore.Storage.Json;

namespace ChepuPizza.BLL.Services
{
    public class AuthService : IAuthService
    {
        public async Task<AuthResponse> RegisterAsync(RegisterUserRequest request)
        {
            (User? user, string? error) = User.Create(request.Username, request.Password);
            if(user == null)
            {
                throw new Exception(error);
            }

            var hashedPassword = new PasswordHasher<User>()


        }
    }
}
