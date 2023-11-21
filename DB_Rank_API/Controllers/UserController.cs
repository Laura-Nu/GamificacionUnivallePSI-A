using DB_Rank_API.Models;
using DB_Rank_API.RequestedSh;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace DB_Rank_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public UserController(BdrankingContext context)
        {
            _context = context;
        }

        [HttpPost("change-password")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            // Verificar la identidad del usuario (debes implementar esto según tu lógica)
            var user = _context.People.SingleOrDefault(p => p.PersonId == request.UserId);

            if (user == null)
            {
                return NotFound("Usuario no encontrado");
            }

            // Verificar la contraseña actual del usuario
            if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.Password))
            {
                return BadRequest("La contraseña actual es incorrecta");
            }

            // Hashear y almacenar la nueva contraseña
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            _context.SaveChanges();

            return Ok("Contraseña cambiada exitosamente");
        }

        // POST: api/User
        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            if (ModelState.IsValid)
            {
                Person newUser;
                if (request.Role == "Student")
                {
                    newUser = new Person
                    {
                        FirstName = request.FirstName,
                        LastName = request.LastName,
                        SecondLastName = request.SecondLastName,
                        AcademicUnityId = request.AcademicUnityId,
                        CareerId = request.CareerId,
                        Status = request.Status,
                        RegisterDate = request.RegisterDate,
                        Role = request.Role,
                        Email = request.Email,
                        Username = request.Username,

                        Password = BCrypt.Net.BCrypt.HashPassword(request.Password),

                        Student = new Student
                        {
                            Rank = request.Student.Rank,
                            Score = request.Student.Score
                        },
                    };
                }
                else
                {
                    newUser = new Person
                    {
                        FirstName = request.FirstName,
                        LastName = request.LastName,
                        SecondLastName = request.SecondLastName,
                        AcademicUnityId = request.AcademicUnityId,
                        CareerId = request.CareerId,
                        Status = request.Status,
                        RegisterDate = request.RegisterDate,
                        Role = request.Role,
                        Email = request.Email,
                        Username = request.Username,
                        ExpireDateAdmin = request.ExpireDateAdmin,

                        // Cifra la contraseña utilizando bcrypt
                        Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    };
                }

                _context.People.Add(newUser);
                await _context.SaveChangesAsync();

                var jsonSerializerOptions = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve,
                };

                var jsonUser = JsonSerializer.Serialize(newUser, jsonSerializerOptions);

                return Ok(new { message = "Usuario creado con éxito", user = jsonUser });
            }

            return BadRequest(ModelState);
        }
    }
}
