using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Career
{
    public int CareerId { get; set; }

    public string CareerName { get; set; } = null!;

    public int DepartmentId { get; set; }

    public byte Status { get; set; }

    public DateTime? RegisterDate { get; set; }

    public virtual Department Department { get; set; } = null!;

    public virtual ICollection<Person> People { get; set; } = new List<Person>();
}
