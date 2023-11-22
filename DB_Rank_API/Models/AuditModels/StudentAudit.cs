namespace DB_Rank_API.Models.AuditModels
{
    public partial class StudentAudit
    {
        public int StudentAuditId { get; set; }
        public int PersonId { get; set; }
        public int OldScore { get; set; }
        public int ActualScore { get; set; }
        public string OldRank { get; set; } = null!;
        public string ActualRank { get; set; } = null!;
        public string Action { get; set; } = null!;
        public DateTime ModificationDate { get; set; } = DateTime.Now;
        public int UserId { get; set; }

        public virtual Student? Student { get; set; }
        public virtual Person? User { get; set; }
    }
}
