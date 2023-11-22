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
    public class StudentBadgesController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public StudentBadgesController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/StudentBadges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentBadge>>> GetStudentBadges()
        {
            var studentBadges = await _context.StudentBadges.ToListAsync();

            if (studentBadges == null)
            {
                return NotFound();
            }

            return studentBadges;
        }

        // GET: api/StudentBadges/5
        [HttpGet("{personId}/{badgeId}")]
        public async Task<ActionResult<StudentBadge>> GetStudentBadge(int personId, int badgeId)
        {
            var studentBadge = await _context.StudentBadges.FindAsync(personId, badgeId);

            if (studentBadge == null)
            {
                return NotFound();
            }

            return studentBadge;
        }

        // GET: api/StudentBadges/ByPerson/5
        [HttpGet("{personId}")]
        public async Task<ActionResult<IEnumerable<StudentBadge>>> GetBadgesByPerson(int personId)
        {
            var badgesByPerson = await _context.StudentBadges
                                .Where(sb => sb.PersonId == personId)
                                .Include(sb => sb.Person)  // Cargar la propiedad de navegación Person
                                .Include(sb => sb.Badge)  // Cargar la propiedad de navegación Badge
                                .ToListAsync();

            if (badgesByPerson == null)
            {
                return NotFound();
            }

            return badgesByPerson;
        }


        // PUT: api/StudentBadges/5
        [HttpPut("{personId}/{badgeId}")]
        public async Task<IActionResult> PutStudentBadge(int personId, int badgeId, StudentBadge studentBadge)
        {
            if (personId != studentBadge.PersonId || badgeId != studentBadge.BadgeId)
            {
                return BadRequest();
            }

            _context.Entry(studentBadge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentBadgeExists(personId, badgeId))
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

        // POST: api/StudentBadges
        [HttpPost]
        public async Task<ActionResult<StudentBadge>> PostStudentBadge(StudentBadge studentBadge)
        {
            _context.StudentBadges.Add(studentBadge);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StudentBadgeExists(studentBadge.PersonId, studentBadge.BadgeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStudentBadge", new { personId = studentBadge.PersonId, badgeId = studentBadge.BadgeId }, studentBadge);
        }

        // DELETE: api/StudentBadges/5
        [HttpDelete("{personId}/{badgeId}")]
        public async Task<IActionResult> DeleteStudentBadge(int personId, int badgeId)
        {
            var studentBadge = await _context.StudentBadges.FindAsync(personId, badgeId);
            if (studentBadge == null)
            {
                return NotFound();
            }

            _context.StudentBadges.Remove(studentBadge);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentBadgeExists(int personId, int badgeId)
        {
            return _context.StudentBadges.Any(e => e.PersonId == personId && e.BadgeId == badgeId);
        }
    }
}
