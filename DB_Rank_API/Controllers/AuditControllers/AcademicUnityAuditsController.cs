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
    public class AcademicUnityAuditsController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public AcademicUnityAuditsController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/AcademicUnityAudits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AcademicUnityAudit>>> GetAcademicUnityAudits()
        {
          if (_context.AcademicUnityAudits == null)
          {
              return NotFound();
          }
            return await _context.AcademicUnityAudits.ToListAsync();
        }

        // GET: api/AcademicUnityAudits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AcademicUnityAudit>> GetAcademicUnityAudit(int id)
        {
          if (_context.AcademicUnityAudits == null)
          {
              return NotFound();
          }
            var academicUnityAudit = await _context.AcademicUnityAudits.FindAsync(id);

            if (academicUnityAudit == null)
            {
                return NotFound();
            }

            return academicUnityAudit;
        }

        // PUT: api/AcademicUnityAudits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcademicUnityAudit(int id, AcademicUnityAudit academicUnityAudit)
        {
            if (id != academicUnityAudit.AcademicUnityAuditId)
            {
                return BadRequest();
            }

            _context.Entry(academicUnityAudit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcademicUnityAuditExists(id))
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

        // POST: api/AcademicUnityAudits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AcademicUnityAudit>> PostAcademicUnityAudit(AcademicUnityAudit academicUnityAudit)
        {
          if (_context.AcademicUnityAudits == null)
          {
              return Problem("Entity set 'BdrankingContext.AcademicUnityAudits'  is null.");
          }
            _context.AcademicUnityAudits.Add(academicUnityAudit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcademicUnityAudit", new { id = academicUnityAudit.AcademicUnityAuditId }, academicUnityAudit);
        }

        // DELETE: api/AcademicUnityAudits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcademicUnityAudit(int id)
        {
            if (_context.AcademicUnityAudits == null)
            {
                return NotFound();
            }
            var academicUnityAudit = await _context.AcademicUnityAudits.FindAsync(id);
            if (academicUnityAudit == null)
            {
                return NotFound();
            }

            _context.AcademicUnityAudits.Remove(academicUnityAudit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AcademicUnityAuditExists(int id)
        {
            return (_context.AcademicUnityAudits?.Any(e => e.AcademicUnityAuditId == id)).GetValueOrDefault();
        }
    }
}
