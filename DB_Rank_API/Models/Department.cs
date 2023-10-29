using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = null!;

    public int FacultyId { get; set; }

<<<<<<< HEAD
    public byte Status { get; set; }

    public DateTime? RegisterDate { get; set; }

    public virtual ICollection<Career> Careers { get; set; } = new List<Career>();

    public virtual Faculty Faculty { get; set; } = null!;
=======
    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;

    public virtual ICollection<Career> Careers { get; set; } = new List<Career>();

    public virtual Faculty? Faculty { get; set; }
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b
}
