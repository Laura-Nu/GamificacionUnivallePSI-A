using System;
using System.Collections.Generic;
<<<<<<< HEAD

=======
using System.Text.Json.Serialization;

>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b
namespace DB_Rank_API.Models;

public partial class Student
{
    public int PersonId { get; set; }

<<<<<<< HEAD
    public byte Rank { get; set; }

    public int Score { get; set; }

    public virtual Person Person { get; set; } = null!;

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

    public virtual ICollection<Sanction> Sanctions { get; set; } = new List<Sanction>();
=======
    public string Rank { get; set; } = null!;

    public int Score { get; set; }

    [JsonIgnore]
    public virtual Person? Person { get; set; }

    //public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

    //public virtual ICollection<Sanction> Sanctions { get; set; } = new List<Sanction>();
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b
}
