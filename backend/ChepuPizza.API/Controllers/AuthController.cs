using ChepuPizza.BLL.DTO;
using ChepuPizza.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ChepuPizza.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(RegisterUserRequest request)
        {
            var response = await _authService.RegisterAsync(request);
            return Ok(response);
        }
    }
}
