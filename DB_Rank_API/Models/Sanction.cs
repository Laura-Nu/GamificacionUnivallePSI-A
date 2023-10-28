using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Sanction
{
    public int SanctionId { get; set; }

    public string SanctionName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public double Punctuation { get; set; }

    public byte Status { get; set; } = 1;

    public DateTime RegisterDate { get; set; } = DateTime.Now;
}
