using DB_Rank_API.Models;
using DB_Rank_API.RequestedSh;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using BCrypt.Net;

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

        // POST: api/User
        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser(CreateUserRequest request)
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
                        ExpireDateAdmin = request.ExpireDateAdmin,

                        // Cifra la contraseña utilizando bcrypt
                        Password = BCrypt.Net.BCrypt.HashPassword(request.Password),


                        Student = new Student
                        {
                            Rank = "Bronce",
                            Score = 0
                        },
                        //Professor = new Professor()
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

                // Configura las opciones de serialización JSON para manejar referencias circulares
                var jsonSerializerOptions = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve,
                    // Otras opciones personalizadas si es necesario
                };

                // Serializa el objeto newUser a JSON
                var jsonUser = JsonSerializer.Serialize(newUser, jsonSerializerOptions);

                // Regresa el JSON serializado en la respuesta
                return Ok(new { message = "Usuario creado con éxito", user = jsonUser });
            }

            return BadRequest(ModelState);
        }
    }
}
