namespace DB_Rank_API.Models.AuditModels
{
    public partial class AcademicUnityAudit
    {
        public int AcademicUnityAuditId { get; set; }
        public int AcademicUnityId { get; set; }
        public string OldAcademicUnityName { get; set; } = null!;
        public string ActualAcademicUnityName { get; set; } = null!;
        public string Action { get; set; } = null!;
        public DateTime ModificationDate { get; set; } = DateTime.Now;
        public int UserId { get; set; }

        public virtual AcademicUnity? AcademicUnity { get; set; }
        public virtual Person? User { get; set; }
    }
}
