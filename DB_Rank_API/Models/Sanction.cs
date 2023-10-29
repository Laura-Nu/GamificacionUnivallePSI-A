using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Sanction
{
<<<<<<< HEAD
    public int SanctionsId { get; set; }

    public int StudentsId { get; set; }
=======
    public int SanctionId { get; set; }

    public string SanctionName { get; set; } = null!;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b

    public string Description { get; set; } = null!;

    public double Punctuation { get; set; }

<<<<<<< HEAD
    public int? StudentPersonId { get; set; }

    public virtual Student? StudentPerson { get; set; }
=======
    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b
}
