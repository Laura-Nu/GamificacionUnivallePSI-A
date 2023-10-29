using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Professor
{
    public int PersonId { get; set; }

    public virtual Person Person { get; set; } = null!;
}
