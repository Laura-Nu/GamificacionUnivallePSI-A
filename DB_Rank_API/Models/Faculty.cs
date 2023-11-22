
using DB_Rank_API.Models.AuditModels;
using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Faculty
{
    public int FacultyId { get; set; }

    public string FacultyName { get; set; } = null!;

    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;

    public virtual ICollection<Department>? Departments { get; set; }

    public virtual ICollection<FacultyAudit>? FacultyAudits { get; set; }

}
