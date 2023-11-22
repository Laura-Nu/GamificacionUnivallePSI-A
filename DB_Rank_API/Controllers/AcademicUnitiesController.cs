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
    public class AcademicUnitiesController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public AcademicUnitiesController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/AcademicUnities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AcademicUnity>>> GetAcademicUnities()
        {
          if (_context.AcademicUnities == null)
          {
              return NotFound();
          }
            return await _context.AcademicUnities.ToListAsync();
        }

        // GET: api/AcademicUnities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AcademicUnity>> GetAcademicUnity(int id)
        {
          if (_context.AcademicUnities == null)
          {
              return NotFound();
          }
            var academicUnity = await _context.AcademicUnities.FindAsync(id);

            if (academicUnity == null)
            {
                return NotFound();
            }

            return academicUnity;
        }

        // PUT: api/AcademicUnities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcademicUnity(int id, AcademicUnity academicUnity)
        {
            if (id != academicUnity.AcademicUnityId)
            {
                return BadRequest();
            }

            var existingAcademicUnity = await _context.AcademicUnities.FindAsync(id);

            if (existingAcademicUnity != null)
            {
                academicUnity.RegisterDate = existingAcademicUnity.RegisterDate;
                //academicUnity.Status = existingAcademicUnity.Status;
                _context.Entry(existingAcademicUnity).CurrentValues.SetValues(academicUnity);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcademicUnityExists(id))
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

        // POST: api/AcademicUnities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AcademicUnity>> PostAcademicUnity(AcademicUnity academicUnity)
        {
          if (_context.AcademicUnities == null)
          {
              return Problem("Entity set 'BdrankingContext.AcademicUnities'  is null.");
          }
            _context.AcademicUnities.Add(academicUnity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcademicUnity", new { id = academicUnity.AcademicUnityId }, academicUnity);
        }

        // DELETE: api/AcademicUnities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcademicUnity(int id)
        {
            if (_context.AcademicUnities == null)
            {
                return NotFound();
            }
            var academicUnity = await _context.AcademicUnities.FindAsync(id);
            if (academicUnity == null)
            {
                return NotFound();
            }

            _context.AcademicUnities.Remove(academicUnity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AcademicUnityExists(int id)
        {
            return (_context.AcademicUnities?.Any(e => e.AcademicUnityId == id)).GetValueOrDefault();
        }
    }
}
