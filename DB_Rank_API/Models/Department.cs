using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = null!;

    public int FacultyId { get; set; }

    public byte Status { get; set; }

    public DateTime? RegisterDate { get; set; }

    public virtual ICollection<Career> Careers { get; set; } = new List<Career>();

    public virtual Faculty Faculty { get; set; } = null!;
}
