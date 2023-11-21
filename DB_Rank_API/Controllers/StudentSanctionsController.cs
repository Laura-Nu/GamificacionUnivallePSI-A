using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DB_Rank_API.Models;

namespace DB_Rank_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentSanctionsController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public StudentSanctionsController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/StudentSanctions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentSanction>>> GetStudentSanctions()
        {
            if (_context.StudentSanctions == null)
            {
                return NotFound();
            }
            return await _context.StudentSanctions.ToListAsync();
        }

        // GET: api/StudentSanctions/ByPerson/5
        [HttpGet("ByPerson/{personId}")]
        public async Task<ActionResult<IEnumerable<StudentSanction>>> GetStudentSanctionsByPerson(int personId)
        {
            var studentSanctionsByPerson = await _context.StudentSanctions
            .Where(ss => ss.PersonId == personId)
            .Include(ss => ss.Person) // Incluir la entidad Person relacionada
            .Include(ss => ss.Sanction) // Incluir la entidad Sanction relacionada
            .ToListAsync();

            if (studentSanctionsByPerson == null)
            {
                return NotFound();
            }

            return studentSanctionsByPerson;
        }

        // GET: api/StudentSanctions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentSanction>> GetStudentSanction(int id)
        {
            if (_context.StudentSanctions == null)
            {
                return NotFound();
            }
            var studentSanction = await _context.StudentSanctions.FindAsync(id);

            if (studentSanction == null)
            {
                return NotFound();
            }

            return studentSanction;
        }

        // PUT: api/StudentSanctions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentSanction(int id, StudentSanction studentSanction)
        {
            if (id != studentSanction.StudentSanctionId)
            {
                return BadRequest();
            }

            _context.Entry(studentSanction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentSanctionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StudentSanctions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentSanction>> PostStudentSanction(StudentSanction studentSanction)
        {
            if (_context.StudentSanctions == null)
            {
                return Problem("Entity set 'BdrankingContext.StudentSanctions' is null.");
            }

            _context.StudentSanctions.Add(studentSanction);
            await _context.SaveChangesAsync();

            // Obtener el estudiante asociado a través de studentSanction.PersonId
            var student = await _context.Students.FindAsync(studentSanction.PersonId);

            if (student == null)
            {
                return NotFound("Estudiante no encontrado");
            }

            var sanction = await _context.Sanctions.FindAsync(studentSanction.SanctionId);

            if (sanction == null)
            {
                return NotFound("Sanción no encontrada");
            }

            int punctuationInt = Convert.ToInt32(sanction.Punctuation);
            if (sanction.Type == "Achievement")
            {
                student.Score += punctuationInt;
            }
            else if (sanction.Type == "Sanction")
            {
                student.Score -= punctuationInt;
            }

            // Guardar los cambios en el puntaje del estudiante
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentSanction", new { id = studentSanction.StudentSanctionId }, studentSanction);
        }


        // DELETE: api/StudentSanctions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentSanction(int id)
        {
            if (_context.StudentSanctions == null)
            {
                return NotFound();
            }
            var studentSanction = await _context.StudentSanctions.FindAsync(id);
            if (studentSanction == null)
            {
                return NotFound();
            }

            _context.StudentSanctions.Remove(studentSanction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentSanctionExists(int id)
        {
            return (_context.StudentSanctions?.Any(e => e.StudentSanctionId == id)).GetValueOrDefault();
        }
    }
}
