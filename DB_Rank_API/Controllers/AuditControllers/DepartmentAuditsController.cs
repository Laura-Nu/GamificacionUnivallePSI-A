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
    public class DepartmentAuditsController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public DepartmentAuditsController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/DepartmentAudits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentAudit>>> GetDepartmentAudits()
        {
          if (_context.DepartmentAudits == null)
          {
              return NotFound();
          }
            return await _context.DepartmentAudits.ToListAsync();
        }

        // GET: api/DepartmentAudits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentAudit>> GetDepartmentAudit(int id)
        {
          if (_context.DepartmentAudits == null)
          {
              return NotFound();
          }
            var departmentAudit = await _context.DepartmentAudits.FindAsync(id);

            if (departmentAudit == null)
            {
                return NotFound();
            }

            return departmentAudit;
        }

        // PUT: api/DepartmentAudits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartmentAudit(int id, DepartmentAudit departmentAudit)
        {
            if (id != departmentAudit.DepartmentAuditId)
            {
                return BadRequest();
            }

            _context.Entry(departmentAudit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentAuditExists(id))
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

        // POST: api/DepartmentAudits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DepartmentAudit>> PostDepartmentAudit(DepartmentAudit departmentAudit)
        {
          if (_context.DepartmentAudits == null)
          {
              return Problem("Entity set 'BdrankingContext.DepartmentAudits'  is null.");
          }
            _context.DepartmentAudits.Add(departmentAudit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartmentAudit", new { id = departmentAudit.DepartmentAuditId }, departmentAudit);
        }

        // DELETE: api/DepartmentAudits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartmentAudit(int id)
        {
            if (_context.DepartmentAudits == null)
            {
                return NotFound();
            }
            var departmentAudit = await _context.DepartmentAudits.FindAsync(id);
            if (departmentAudit == null)
            {
                return NotFound();
            }

            _context.DepartmentAudits.Remove(departmentAudit);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartmentAuditExists(int id)
        {
            return (_context.DepartmentAudits?.Any(e => e.DepartmentAuditId == id)).GetValueOrDefault();
        }
    }
}
