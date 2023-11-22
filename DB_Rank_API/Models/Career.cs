
using DB_Rank_API.Models.AuditModels;
using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Career
{
    public int CareerId { get; set; }

    public string CareerName { get; set; } = null!;

    public int DepartmentId { get; set; }

    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;

    public virtual Department? Department { get; set; }

    public virtual ICollection<Person>? People { get; set; }
    public virtual ICollection<CareerAudit>? CareerAudits { get; set; }
}
