using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Career
{
    public int CareerId { get; set; }

    public string CareerName { get; set; } = null!;

    public int DepartmentId { get; set; }

<<<<<<< HEAD
    public byte Status { get; set; }

    public DateTime? RegisterDate { get; set; }

    public virtual Department Department { get; set; } = null!;
=======
    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;

    public virtual Department? Department { get; set; }
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b

    public virtual ICollection<Person> People { get; set; } = new List<Person>();
}
