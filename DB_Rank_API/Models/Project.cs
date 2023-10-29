using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Project
{
    public int ProjectsId { get; set; }

    public int StudentsId { get; set; }

    public string Achievment { get; set; } = null!;

    public string ProjectName { get; set; } = null!;

    public double Punctuation { get; set; }

<<<<<<< HEAD
    public byte Status { get; set; }

    public DateTime RegisterDate { get; set; }
=======
    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b

    public int? StudentPersonId { get; set; }

    public virtual Student? StudentPerson { get; set; }
}
