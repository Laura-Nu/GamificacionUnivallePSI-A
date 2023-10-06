using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class AcademicUnity
{
    public int AcademicUnityId { get; set; }

    public string AcademicUnityName { get; set; } = null!;

    public byte Status { get; set; }

    public DateTime? RegisterDate { get; set; }

    public virtual ICollection<Person> People { get; set; } = new List<Person>();
}
