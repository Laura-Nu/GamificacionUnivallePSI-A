using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using DB_Rank_API.Models;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using System.Text;
using BCrypt.Net;

namespace DB_Rank_API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BdrankingContext _dbContext; // Reemplaza BdrankingContext con el contexto de tu base de datos.

        public AuthController(BdrankingContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Realiza la validación de las credenciales del usuario en tu base de datos.
            var user = await _dbContext.People.SingleOrDefaultAsync(p => p.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password)) // Utiliza BCrypt.Verify para verificar la contraseña
            {
                return BadRequest(new { message = "Credenciales inválidas" });
            }

            // Crea las claims (información del usuario) que deseas incluir en el token.
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                // Agrega más claims según sea necesario.
            };

            // Crea la identidad del usuario.
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            // Crea el principal del usuario.
            var principal = new ClaimsPrincipal(identity);

            // Autentica al usuario y emite una cookie de autenticación.
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return Ok(new { message = "Inicio de sesión exitoso", role = user.Role });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Cierra la sesión del usuario y elimina la cookie de autenticación.
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok(new { message = "Cierre de sesión exitoso" });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
