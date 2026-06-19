using ChepuPizza.BLL.DTO;
using ChepuPizza.BLL.Interfaces;
using ChepuPizza.DAL.Interfaces;
using ChepuPizza.DAL.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace ChepuPizza.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        public async Task<AuthResponse> RegisterAsync(RegisterUserRequest request)
        {
            (User? user, string? error) = User.Create(request.Username, request.Password);
            if (user == null)
            {
                throw new Exception(error);
            }

            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(user, request.Password);

            user.SetPasswordHash(hashedPassword);

            user = await _userRepository.CreateAsync(user);

            AuthResponse response = new AuthResponse();
            response.Username = user.Username;
            response.Id = user.Id;

            return response;
        }
    }
}
