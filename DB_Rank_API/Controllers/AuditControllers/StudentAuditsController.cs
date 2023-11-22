using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DB_Rank_API.Models;
using DB_Rank_API.Models.AuditModels;

namespace DB_Rank_API.Controllers.AuditControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAuditsController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public StudentAuditsController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/StudentAudits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentAudit>>> GetStudentAudits()
        {
          if (_context.StudentAudits == null)
          {
              return NotFound();
          }
            return await _context.StudentAudits.ToListAsync();
        }

        // GET: api/StudentAudits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentAudit>> GetStudentAudit(int id)
        {
          if (_context.StudentAudits == null)
          {
              return NotFound();
          }
            var studentAudit = await _context.StudentAudits.FindAsync(id);

            if (studentAudit == null)
            {
                return NotFound();
            }

            return studentAudit;
        }

        // PUT: api/StudentAudits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentAudit(int id, StudentAudit studentAudit)
        {
            if (id != studentAudit.StudentAuditId)
            {
                return BadRequest();
            }

            _context.Entry(studentAudit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentAuditExists(id))
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

        // POST: api/StudentAudits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentAudit>> PostStudentAudit(StudentAudit studentAudit)
        {
          if (_context.StudentAudits == null)
          {
              return Problem("Entity set 'BdrankingContext.StudentAudits'  is null.");
          }
            _context.StudentAudits.Add(studentAudit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentAudit", new { id = studentAudit.StudentAuditId }, studentAudit);
        }

        // DELETE: api/StudentAudits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentAudit(int id)
        {
            if (_context.StudentAudits == null)
            {
                return NotFound();
            }
            var studentAudit = await _context.StudentAudits.FindAsync(id);
            if (studentAudit == null)
            {
                return NotFound();
            }

            _context.StudentAudits.Remove(studentAudit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentAuditExists(int id)
        {
            return (_context.StudentAudits?.Any(e => e.StudentAuditId == id)).GetValueOrDefault();
        }
    }
}
