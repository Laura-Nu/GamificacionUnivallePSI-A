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
    public class BadgeAuditsController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public BadgeAuditsController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/BadgeAudits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BadgeAudit>>> GetBadgeAudits()
        {
          if (_context.BadgeAudits == null)
          {
              return NotFound();
          }
            return await _context.BadgeAudits.ToListAsync();
        }

        // GET: api/BadgeAudits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BadgeAudit>> GetBadgeAudit(int id)
        {
          if (_context.BadgeAudits == null)
          {
              return NotFound();
          }
            var badgeAudit = await _context.BadgeAudits.FindAsync(id);

            if (badgeAudit == null)
            {
                return NotFound();
            }

            return badgeAudit;
        }

        // PUT: api/BadgeAudits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBadgeAudit(int id, BadgeAudit badgeAudit)
        {
            if (id != badgeAudit.BadgeAuditId)
            {
                return BadRequest();
            }

            _context.Entry(badgeAudit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BadgeAuditExists(id))
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

        // POST: api/BadgeAudits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BadgeAudit>> PostBadgeAudit(BadgeAudit badgeAudit)
        {
          if (_context.BadgeAudits == null)
          {
              return Problem("Entity set 'BdrankingContext.BadgeAudits'  is null.");
          }
            _context.BadgeAudits.Add(badgeAudit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBadgeAudit", new { id = badgeAudit.BadgeAuditId }, badgeAudit);
        }

        // DELETE: api/BadgeAudits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBadgeAudit(int id)
        {
            if (_context.BadgeAudits == null)
            {
                return NotFound();
            }
            var badgeAudit = await _context.BadgeAudits.FindAsync(id);
            if (badgeAudit == null)
            {
                return NotFound();
            }

            _context.BadgeAudits.Remove(badgeAudit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BadgeAuditExists(int id)
        {
            return (_context.BadgeAudits?.Any(e => e.BadgeAuditId == id)).GetValueOrDefault();
        }
    }
}
