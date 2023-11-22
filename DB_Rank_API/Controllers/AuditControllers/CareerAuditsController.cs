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
    public class CareerAuditsController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public CareerAuditsController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/CareerAudits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CareerAudit>>> GetCareerAudits()
        {
          if (_context.CareerAudits == null)
          {
              return NotFound();
          }
            return await _context.CareerAudits.ToListAsync();
        }

        // GET: api/CareerAudits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CareerAudit>> GetCareerAudit(int id)
        {
          if (_context.CareerAudits == null)
          {
              return NotFound();
          }
            var careerAudit = await _context.CareerAudits.FindAsync(id);

            if (careerAudit == null)
            {
                return NotFound();
            }

            return careerAudit;
        }

        // PUT: api/CareerAudits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCareerAudit(int id, CareerAudit careerAudit)
        {
            if (id != careerAudit.CareerAuditId)
            {
                return BadRequest();
            }

            _context.Entry(careerAudit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CareerAuditExists(id))
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

        // POST: api/CareerAudits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CareerAudit>> PostCareerAudit(CareerAudit careerAudit)
        {
          if (_context.CareerAudits == null)
          {
              return Problem("Entity set 'BdrankingContext.CareerAudits'  is null.");
          }
            _context.CareerAudits.Add(careerAudit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCareerAudit", new { id = careerAudit.CareerAuditId }, careerAudit);
        }

        // DELETE: api/CareerAudits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCareerAudit(int id)
        {
            if (_context.CareerAudits == null)
            {
                return NotFound();
            }
            var careerAudit = await _context.CareerAudits.FindAsync(id);
            if (careerAudit == null)
            {
                return NotFound();
            }

            _context.CareerAudits.Remove(careerAudit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CareerAuditExists(int id)
        {
            return (_context.CareerAudits?.Any(e => e.CareerAuditId == id)).GetValueOrDefault();
        }
    }
}
