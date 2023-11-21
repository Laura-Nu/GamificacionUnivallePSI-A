namespace DB_Rank_API.Models.AuditModels
{
    public partial class BadgeAudit
    {
        public int BadgeAuditId { get; set; }
        public int BadgeId { get; set; }
        public string OldBadgeName { get; set; } = null!;
        public string ActualBadgeName { get; set; } = null!;
        public string OldImage { get; set; } = null!;
        public string ActualImage { get; set; } = null!;
        public string Action { get; set; } = null!;
        public DateTime ModificationDate { get; set; } = DateTime.Now;
        public int UserId { get; set; }

        public virtual Badge? Badge { get; set; }
        public virtual Person? User { get; set; }
    }
}
