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
    public class SanctionsController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public SanctionsController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/Sanctions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sanction>>> GetSanctions()
        {
            if (_context.Sanctions == null)
            {
                return NotFound();
            }
            return await _context.Sanctions.ToListAsync();
        }

        // GET: api/Sanctions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sanction>> GetSanction(int id)
        {
            if (_context.Sanctions == null)
            {
                return NotFound();
            }
            var sanction = await _context.Sanctions.FindAsync(id);

            if (sanction == null)
            {
                return NotFound();
            }

            return sanction;
        }

        // PUT: api/Sanctions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanction(int id, Sanction sanction)
        {
            if (id != sanction.SanctionId)
            {
                return BadRequest();
            }

            var existingSanction = await _context.Sanctions.FindAsync(id);

            if (existingSanction != null)
            {
                sanction.RegisterDate = existingSanction.RegisterDate;
                sanction.Status = existingSanction.Status;
                _context.Entry(existingSanction).CurrentValues.SetValues(sanction);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanctionExists(id))
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

        // POST: api/Sanction
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sanction>> PostSanction(Sanction sanction)
        {
            if (_context.Sanctions == null)
            {
                return Problem("Entity set 'BdrankingContext.Sanctions'  is null.");
            }
            _context.Sanctions.Add(sanction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSanction", new { id = sanction.SanctionId }, sanction);
        }

        // DELETE: api/Sanctions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSanction(int id)
        {
            if (_context.Sanctions == null)
            {
                return NotFound();
            }
            var sanction = await _context.Sanctions.FindAsync(id);
            if (sanction == null)
            {
                return NotFound();
            }

            _context.Sanctions.Remove(sanction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SanctionExists(int id)
        {
            return (_context.Sanctions?.Any(e => e.SanctionId == id)).GetValueOrDefault();
        }
    }
}
