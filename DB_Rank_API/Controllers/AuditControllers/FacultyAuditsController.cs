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
    public class FacultyAuditsController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public FacultyAuditsController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/FacultyAudits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FacultyAudit>>> GetFacultyAudits()
        {
          if (_context.FacultyAudits == null)
          {
              return NotFound();
          }
            return await _context.FacultyAudits.ToListAsync();
        }

        // GET: api/FacultyAudits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FacultyAudit>> GetFacultyAudit(int id)
        {
          if (_context.FacultyAudits == null)
          {
              return NotFound();
          }
            var facultyAudit = await _context.FacultyAudits.FindAsync(id);

            if (facultyAudit == null)
            {
                return NotFound();
            }

            return facultyAudit;
        }

        // PUT: api/FacultyAudits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFacultyAudit(int id, FacultyAudit facultyAudit)
        {
            if (id != facultyAudit.FacultyAuditId)
            {
                return BadRequest();
            }

            _context.Entry(facultyAudit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacultyAuditExists(id))
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

        // POST: api/FacultyAudits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FacultyAudit>> PostFacultyAudit(FacultyAudit facultyAudit)
        {
          if (_context.FacultyAudits == null)
          {
              return Problem("Entity set 'BdrankingContext.FacultyAudits'  is null.");
          }
            _context.FacultyAudits.Add(facultyAudit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFacultyAudit", new { id = facultyAudit.FacultyAuditId }, facultyAudit);
        }

        // DELETE: api/FacultyAudits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFacultyAudit(int id)
        {
            if (_context.FacultyAudits == null)
            {
                return NotFound();
            }
            var facultyAudit = await _context.FacultyAudits.FindAsync(id);
            if (facultyAudit == null)
            {
                return NotFound();
            }

            _context.FacultyAudits.Remove(facultyAudit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FacultyAuditExists(int id)
        {
            return (_context.FacultyAudits?.Any(e => e.FacultyAuditId == id)).GetValueOrDefault();
        }
    }
}
