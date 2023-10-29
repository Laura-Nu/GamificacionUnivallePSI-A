using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class AcademicUnity
{
    public int AcademicUnityId { get; set; }

    public string AcademicUnityName { get; set; } = null!;

<<<<<<< HEAD
    public byte Status { get; set; }

    public DateTime? RegisterDate { get; set; }
=======
    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b

    public virtual ICollection<Person> People { get; set; } = new List<Person>();
}
