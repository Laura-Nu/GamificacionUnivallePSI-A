using System;
using System.Collections.Generic;

namespace DB_Rank_API.Models;

public partial class Project
{
    public int ProjectsId { get; set; }

    public int StudentsId { get; set; }

    public string Achievment { get; set; } = null!;

    public string ProjectName { get; set; } = null!;

    public double Punctuation { get; set; }

    public byte Status { get; set; }

    public DateTime RegisterDate { get; set; }

    public int? StudentPersonId { get; set; }

    public virtual Student? StudentPerson { get; set; }
}
