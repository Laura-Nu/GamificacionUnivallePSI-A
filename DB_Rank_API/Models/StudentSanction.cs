namespace DB_Rank_API.Models
{
    public partial class StudentSanction
    {
        public int StudentSanctionId { get; set; }

        public int PersonId { get; set; }

        public int SanctionId { get; set; }

        public DateTime AssignmentDate { get; set; } = DateTime.Now;

        public virtual Person? Person { get; set; }

        public virtual Sanction? Sanction { get; set; }
    }
}
