namespace DB_Rank_API.Models.AuditModels
{
    public partial class SanctionAudit
    {
        public int SanctionAuditId { get; set; }
        public int SanctionId { get; set; }
        public string OldSanctionName { get; set; } = null!;
        public string ActualSanctionName { get; set; } = null!;
        public string OldDescription { get; set; } = null!;
        public string ActualDescription { get; set; } = null!;
        public double OldPunctuation { get; set; }
        public double ActualPunctuation { get; set; }
        public string Action { get; set; } = null!;
        public DateTime ModificationDate { get; set; } = DateTime.Now;
        public int UserId { get; set; }

        public virtual Sanction? Sanction { get; set; }
        public virtual Person? User { get; set; }
    }
}
