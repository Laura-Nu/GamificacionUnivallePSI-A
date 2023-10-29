using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Person
{
    public int PersonId { get; set; }

    public string FirstName { get; set; } = null!;

<<<<<<< HEAD
    public string? LastName { get; set; }
=======
    public string LastName { get; set; } = null!;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b

    public string? SecondLastName { get; set; }

    public int AcademicUnityId { get; set; }

    public int CareerId { get; set; }

<<<<<<< HEAD
    public byte Status { get; set; }

    public DateTime? RegisterDate { get; set; }
=======
    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b

    public string Role { get; set; } = null!;

    public string Email { get; set; } = null!;

<<<<<<< HEAD
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual AcademicUnity AcademicUnity { get; set; } = null!;

    public virtual Career Career { get; set; } = null!;

    public virtual Professor? Professor { get; set; }
=======
    public string? Username { get; set; } = null!;

    public string? Password { get; set; } = null!;

    public DateTime? ExpireDateAdmin { get; set; }

    public virtual AcademicUnity? AcademicUnity { get; set; }

    public virtual Career? Career { get; set; }
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b

    public virtual Student? Student { get; set; }
}
