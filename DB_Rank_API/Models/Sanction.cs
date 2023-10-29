using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Sanction
{
    public int SanctionsId { get; set; }

    public int StudentsId { get; set; }

    public string Description { get; set; } = null!;

    public double Punctuation { get; set; }

    public int? StudentPersonId { get; set; }

    public virtual Student? StudentPerson { get; set; }
}
