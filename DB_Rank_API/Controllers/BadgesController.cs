using System;
using System.IO;
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
    public class BadgesController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public BadgesController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/Badges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Badge>>> GetBadges()
        {
            if (_context.Badges == null)
            {
                return NotFound();
            }
            return await _context.Badges.ToListAsync();
        }

        // GET: api/Badges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Badge>> GetBadge(int id)
        {
            if (_context.Badges == null)
            {
                return NotFound();
            }
            var badge = await _context.Badges.FindAsync(id);

            if (badge == null)
            {
                return NotFound();
            }

            return badge;
        }

        // PUT: api/Badges/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBadge(int id, Badge badge)
        {
            if (id != badge.BadgeId)
            {
                return BadRequest();
            }

            var existingBadge = await _context.Badges.FindAsync(id);

            if (existingBadge != null)
            {
                badge.RegisterDate = existingBadge.RegisterDate;
                badge.Status = existingBadge.Status;
                _context.Entry(existingBadge).CurrentValues.SetValues(badge);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BadgeExists(id))
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

        // POST: api/Badges
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Badge>> PostBadge(Badge badge)
        {
            if (_context.Badges == null)
            {
                return Problem("Entity set 'BdrankingContext.Badges'  is null.");
            }
            _context.Badges.Add(badge);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBadge", new { id = badge.BadgeId }, badge);
        }


        // DELETE: api/Badges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBadge(int id)
        {
            if (_context.Badges == null)
            {
                return NotFound();
            }
            var badge = await _context.Badges.FindAsync(id);
            if (badge == null)
            {
                return NotFound();
            }

            _context.Badges.Remove(badge);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BadgeExists(int id)
        {
            return (_context.Badges?.Any(e => e.BadgeId == id)).GetValueOrDefault();
        }
    }
}
