namespace DB_Rank_API.Models
{
    public partial class StudentBadge
    {
        public int PersonId { get; set; }

        public int BadgeId { get; set; }

        public DateTime AssignmentDate { get; set; } = DateTime.Now;

        public virtual Person? Person { get; set; }

        public virtual Badge? Badge { get; set; }
    }
}
