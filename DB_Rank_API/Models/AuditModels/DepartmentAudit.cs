namespace DB_Rank_API.Models.AuditModels
{
    public partial class DepartmentAudit
    {
        public int DepartmentAuditId { get; set; }
        public int DepartmentId { get; set; }
        public string OldDepartmentName { get; set; } = null!;
        public string ActualDepartmentName { get; set; } = null!;
        public int OldFacultyId { get; set; }
        public int ActualFacultyId { get; set; }
        public string Action { get; set; } = null!;
        public DateTime ModificationDate { get; set; } = DateTime.Now;
        public int UserId { get; set; }

        public virtual Faculty? Faculty { get; set; }
        public virtual Department? Department { get; set; }
        public virtual Person? User { get; set; }
    }
}
