namespace DB_Rank_API.Models.AuditModels
{
    public partial class CareerAudit
    {
        public int CareerAuditId { get; set; }
        public int CareerId { get; set; }
        public string OldCareerName { get; set; } = null!;
        public string ActualCareerName { get; set; } = null!;
        public int OldDepartmentId { get; set; }
        public int ActualDepartmentId { get; set; }
        public string Action { get; set; } = null!;
        public DateTime ModificationDate { get; set; } = DateTime.Now;
        public int UserId { get; set; }

        public virtual Department? Department { get; set; }
        public virtual Career? Career { get; set; }
        public virtual Person? User { get; set; }
    }
}
