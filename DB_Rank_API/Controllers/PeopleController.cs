﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DB_Rank_API.Models;
using DB_Rank_API.RequestedSh;

namespace DB_Rank_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly BdrankingContext _context;

        public PeopleController(BdrankingContext context)
        {
            _context = context;
        }

        // GET: api/People
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople()
        {
            var studentData = _context.People.Include(p => p.Student).ToList();

            if (_context.People == null)
            {
              return NotFound();
            }
            return await _context.People.ToListAsync();
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var studentData = _context.People.Include(p => p.Student).FirstOrDefault(p => p.PersonId == id);
            
           if (_context.People == null)
           {
              return NotFound();
           }
            var person = await _context.People.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        // PUT: api/People/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(int id, Person updatedPerson)
        {
            if (id != updatedPerson.PersonId)
            {
                return BadRequest();
            }

            var existingPerson = await _context.People
                .Include(p => p.Student)
                .FirstOrDefaultAsync(p => p.PersonId == id);

            if (existingPerson == null)
            {
                return NotFound();
            }

            if (existingPerson.Role == "Student" && existingPerson.Student != null)
            {
                existingPerson.Student.Rank = updatedPerson.Student.Rank;
                existingPerson.Student.Score = updatedPerson.Student.Score;
            }

            updatedPerson.RegisterDate = existingPerson.RegisterDate;
            //updatedPerson.Status = existingPerson.Status;
            updatedPerson.Password = existingPerson.Password;
            updatedPerson.Username = existingPerson.Username;
            updatedPerson.Role = existingPerson.Role;
            _context.Entry(existingPerson).CurrentValues.SetValues(updatedPerson);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
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


        // POST: api/People
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
          if (_context.People == null)
          {
              return Problem("Entity set 'BdrankingContext.People'  is null.");
          }
            _context.People.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerson", new { id = person.PersonId }, person);
        }


        // DELETE: api/People/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            if (_context.People == null)
            {
                return NotFound();
            }
            var person = await _context.People.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.People.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonExists(int id)
        {
            return (_context.People?.Any(e => e.PersonId == id)).GetValueOrDefault();
        }
    }
}
