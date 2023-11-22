
using DB_Rank_API.Models.AuditModels;
using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Person
{
    public int PersonId { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string? SecondLastName { get; set; }
    public int AcademicUnityId { get; set; }
    public int CareerId { get; set; }
    public byte Status { get; set; } = 1;
    public DateTime RegisterDate { get; set; } = DateTime.Now;
    public string Role { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Username { get; set; } = null!;
    public string? Password { get; set; } = null!;
    public DateTime? ExpireDateAdmin { get; set; }

    public virtual AcademicUnity? AcademicUnity { get; set; }
    public virtual Career? Career { get; set; }
    public virtual Student? Student { get; set; }

}
