using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Faculty
{
    public int FacultyId { get; set; }

    public string FacultyName { get; set; } = null!;

<<<<<<< HEAD
    public byte Status { get; set; }

    public DateTime? RegisterDate { get; set; }
=======
    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b

    public virtual ICollection<Department> Departments { get; set; } = new List<Department>();
}
