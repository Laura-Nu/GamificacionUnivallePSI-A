﻿
using DB_Rank_API.Models.AuditModels;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DB_Rank_API.Models;

public partial class Student
{
    public int PersonId { get; set; }

    public string Rank { get; set; } = null!;

    public int Score { get; set; }

    [JsonIgnore]
    public virtual Person? Person { get; set; }

    public virtual ICollection<Badge>? Badges { get; set; }

    public virtual ICollection<Sanction>? Sanctions { get; set; }
    public virtual ICollection<StudentAudit>? StudentAudits { get; set; }

    //public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
}
