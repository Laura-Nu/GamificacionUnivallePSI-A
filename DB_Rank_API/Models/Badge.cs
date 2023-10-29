namespace DB_Rank_API.Models
{
    public partial class Badge
    {
        public int BadgeId { get; set; }

        public string BadgeName { get; set; } = null!;

        public string Image { get; set; } = null!;

        public byte Status { get; set; } = 1;

        public DateTime RegisterDate { get; set; } = DateTime.Now;

    }
}
