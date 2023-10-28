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
using Microsoft.AspNetCore.Authorization;

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
        //EndPoint para  la autenteicacion y  genearicon del token

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _dbContext.People.SingleOrDefaultAsync(p => p.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return BadRequest(new { message = "Credenciales inválidas" });
            }

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.NameIdentifier, user.PersonId.ToString()), // Utiliza PersonId como identificador
        new Claim(ClaimTypes.Role, user.Role)
    };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return Ok(new
            {
                message = "Inicio de sesión exitoso",
                user = new
                {
                    Username = user.Username,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    SecondLastName = user.SecondLastName,
                    Role = user.Role, // Esto se basa en el Claim anterior
                    Rank = GetStudentRank(user.PersonId),
                    Score = user.Student?.Score
                }
            });
        }
        // Método para obtener la información del usuario
        [Authorize] // Requiere autenticación
        [HttpGet("getdata")]
        public async Task<IActionResult> GetUserInfo()
        {
            var username = User.Identity.Name; // Username
            var role = User.FindFirst(ClaimTypes.Role)?.Value; // Rol
            var userId = int.Parse(User.FindFirst("UserId")?.Value);

            // Consulta la base de datos para obtener información adicional del usuario
            var userd = _dbContext.People.FirstOrDefault(p => p.PersonId == userId);

            if (userd != null)
            {
                var userInfo = new
                {
                    Username = username,
                    FirstName = userd.FirstName, // Nombre
                    LastName = userd.LastName, // Apellido
                    SecondLastName = userd.SecondLastName, // Segundo apellido
                    Role = role,
                    Rank = (role == "Student") ? GetStudentRank(userId) : null, // Rango (solo si el usuario es un estudiante)
                    Score = (role == "Student") ? userd.Student?.Score : null, // Puntaje (solo si el usuario es un estudiante)
                };

                return Ok(userInfo);
            }

            return BadRequest("Usuario no encontrado");
        }
        private byte? GetStudentRank(int userId)
        {
            var student = _dbContext.Students.FirstOrDefault(s => s.PersonId == userId);
            if (student != null)
            {
                return student.Rank;
            }
            return null;
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
