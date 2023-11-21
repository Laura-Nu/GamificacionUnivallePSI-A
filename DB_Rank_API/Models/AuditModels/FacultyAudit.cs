namespace DB_Rank_API.Models.AuditModels
{
    public partial class FacultyAudit
    {
        public int FacultyAuditId { get; set; }
        public int FacultyId { get; set; }
        public string OldFacultyName { get; set; } = null!;
        public string ActualFacultyName { get; set; } = null!;
        public string Action { get; set; } = null!;
        public DateTime ModificationDate { get; set; } = DateTime.Now;
        public int UserId { get; set; }

        public virtual Faculty? Faculty { get; set; }
        public virtual Person? User { get; set; }


    }
}
