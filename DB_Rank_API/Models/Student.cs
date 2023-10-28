using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Student
{
    public int PersonId { get; set; }

    public string Rank { get; set; } = null!;

    public int Score { get; set; }

    //public virtual Person Person { get; set; } = null!;

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

    //public virtual ICollection<Sanction> Sanctions { get; set; } = new List<Sanction>();
}
