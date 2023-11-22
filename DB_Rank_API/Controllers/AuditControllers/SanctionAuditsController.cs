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
    public class SanctionAuditsController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public SanctionAuditsController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/SanctionAudits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanctionAudit>>> GetSanctionAudits()
        {
          if (_context.SanctionAudits == null)
          {
              return NotFound();
          }
            return await _context.SanctionAudits.ToListAsync();
        }

        // GET: api/SanctionAudits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanctionAudit>> GetSanctionAudit(int id)
        {
          if (_context.SanctionAudits == null)
          {
              return NotFound();
          }
            var sanctionAudit = await _context.SanctionAudits.FindAsync(id);

            if (sanctionAudit == null)
            {
                return NotFound();
            }

            return sanctionAudit;
        }

        // PUT: api/SanctionAudits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanctionAudit(int id, SanctionAudit sanctionAudit)
        {
            if (id != sanctionAudit.SanctionAuditId)
            {
                return BadRequest();
            }

            _context.Entry(sanctionAudit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanctionAuditExists(id))
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

        // POST: api/SanctionAudits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SanctionAudit>> PostSanctionAudit(SanctionAudit sanctionAudit)
        {
          if (_context.SanctionAudits == null)
          {
              return Problem("Entity set 'BdrankingContext.SanctionAudits'  is null.");
          }
            _context.SanctionAudits.Add(sanctionAudit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSanctionAudit", new { id = sanctionAudit.SanctionAuditId }, sanctionAudit);
        }

        // DELETE: api/SanctionAudits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSanctionAudit(int id)
        {
            if (_context.SanctionAudits == null)
            {
                return NotFound();
            }
            var sanctionAudit = await _context.SanctionAudits.FindAsync(id);
            if (sanctionAudit == null)
            {
                return NotFound();
            }

            _context.SanctionAudits.Remove(sanctionAudit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SanctionAuditExists(int id)
        {
            return (_context.SanctionAudits?.Any(e => e.SanctionAuditId == id)).GetValueOrDefault();
        }
    }
}
