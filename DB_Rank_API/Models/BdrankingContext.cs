using System;
using System.Collections.Generic;
using DB_Rank_API.Models.AuditModels;
using Microsoft.EntityFrameworkCore;

namespace DB_Rank_API.Models;

public partial class BdrankingContext : DbContext
{
    public BdrankingContext()
    {
    }

    public BdrankingContext(DbContextOptions<BdrankingContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AcademicUnity> AcademicUnities { get; set; }
    public virtual DbSet<Career> Careers { get; set; }
    public virtual DbSet<Department> Departments { get; set; }
    public virtual DbSet<Faculty> Faculties { get; set; }
    public virtual DbSet<Person> People { get; set; }
    public virtual DbSet<Sanction> Sanctions { get; set; }
    public virtual DbSet<Student> Students { get; set; }
    public virtual DbSet<Badge> Badges { get; set; }

    public virtual DbSet<StudentSanction> StudentSanctions { get; set; }
    public virtual DbSet<StudentBadge> StudentBadges { get; set; }

    public virtual DbSet<AcademicUnityAudit> AcademicUnityAudits { get; set; }
    public virtual DbSet<BadgeAudit> BadgeAudits { get; set; }
    public virtual DbSet<CareerAudit> CareerAudits { get; set; }
    public virtual DbSet<DepartmentAudit> DepartmentAudits { get; set; }
    public virtual DbSet<FacultyAudit> FacultyAudits { get; set; }
    public virtual DbSet<SanctionAudit> SanctionAudits { get; set; }
    public virtual DbSet<StudentAudit> StudentAudits { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-JQCSPOV\\SQLEXPRESS;Initial Catalog=BDRanking;TrustServerCertificate=True;Integrated Security=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AcademicUnity>(entity =>
        {
            entity.ToTable("AcademicUnity");

            entity.Property(e => e.AcademicUnityId).HasColumnName("AcademicUnityID");
            entity.Property(e => e.AcademicUnityName).HasMaxLength(50);
        });

        modelBuilder.Entity<Career>(entity =>
        {
            entity.ToTable("Career");

            entity.HasIndex(e => e.DepartmentId, "IX_Career_DepartmentID");

            entity.Property(e => e.CareerId).HasColumnName("CareerID");
            entity.Property(e => e.CareerName).HasMaxLength(50);
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

            entity.HasOne(d => d.Department).WithMany(p => p.Careers).HasForeignKey(d => d.DepartmentId);
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.ToTable("Department");

            entity.HasIndex(e => e.FacultyId, "IX_Department_FacultyID");

            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.DepartmentName).HasMaxLength(50);
            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");

            entity.HasOne(d => d.Faculty).WithMany(p => p.Departments).HasForeignKey(d => d.FacultyId);
        });

        modelBuilder.Entity<Faculty>(entity =>
        {
            entity.ToTable("Faculty");

            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");
            entity.Property(e => e.FacultyName).HasMaxLength(50);
        });

        modelBuilder.Entity<Person>(entity =>
        {
            entity.ToTable("Person");

            entity.HasIndex(e => e.AcademicUnityId, "IX_Person_AcademicUnityID");

            entity.HasIndex(e => e.CareerId, "IX_Person_CareerID");

            entity.Property(e => e.PersonId).HasColumnName("PersonID");
            entity.Property(e => e.AcademicUnityId).HasColumnName("AcademicUnityID");
            entity.Property(e => e.CareerId).HasColumnName("CareerID");
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.SecondLastName).HasMaxLength(50);

            entity.HasOne(d => d.AcademicUnity).WithMany(p => p.People).HasForeignKey(d => d.AcademicUnityId);
            entity.HasOne(d => d.Career).WithMany(p => p.People).HasForeignKey(d => d.CareerId);
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.PersonId);

            entity.ToTable("Student");

            entity.Property(e => e.PersonId)
                .ValueGeneratedNever()
                .HasColumnName("PersonID");
            entity.Property(e => e.Rank).HasMaxLength(50);
            entity.HasOne(d => d.Person).WithOne(p => p.Student).HasForeignKey<Student>(d => d.PersonId);
        });

        modelBuilder.Entity<Sanction>(entity =>
        {
            entity.HasKey(e => e.SanctionId);
            entity.ToTable("Sanction");
            entity.Property(e => e.SanctionId).HasColumnName("SanctionID");
            entity.Property(e => e.SanctionName).HasMaxLength(60);
            entity.Property(e => e.Description).HasMaxLength(150);
            entity.Property(e => e.Punctuation).HasColumnName("punctuation");
            entity.Property(e => e.Type).HasColumnName("type");
        });

        modelBuilder.Entity<Badge>(entity =>
        {
            entity.HasKey(e => e.BadgeId);
            entity.ToTable("Badge");
            entity.Property(e => e.BadgeId).HasColumnName("BadgeID");
            entity.Property(e => e.BadgeName).HasMaxLength(50);
        });

        modelBuilder.Entity<StudentSanction>(entity =>
        {
            entity.HasKey(e => e.StudentSanctionId);
            entity.ToTable("StudentSanction");

            entity.HasIndex(e => e.PersonId, "IX_StudentSanction_PersonID");
            entity.HasIndex(e => e.SanctionId, "IX_StudentSanction_SanctionID");

            entity.Property(e => e.PersonId).HasColumnName("PersonID");
            entity.Property(e => e.SanctionId).HasColumnName("SanctionID");
        });

        modelBuilder.Entity<StudentBadge>(entity =>
        {
            entity.HasKey(e => new { e.BadgeId, e.PersonId });
            entity.ToTable("StudentBadge");

            entity.HasIndex(e => e.PersonId, "IX_StudentBadge_PersonID");
            entity.HasIndex(e => e.BadgeId, "IX_StudentBadge_BadgeID");

            entity.Property(e => e.PersonId).HasColumnName("PersonID");
            entity.Property(e => e.BadgeId).HasColumnName("BadgeID");
        });

        modelBuilder.Entity<AcademicUnityAudit>(entity =>
        {
            entity.HasKey(e => e.AcademicUnityAuditId);
            entity.ToTable("AcademicUnityAudit");

            entity.HasIndex(e => e.AcademicUnityId, "IX_AcademicUnityAudit_AcademicUnityID");
            entity.HasIndex(e => e.UserId, "IX_AcademicUnityAudit_UserID");

            entity.Property(e => e.AcademicUnityId).HasColumnName("AcademicUnityID");
            entity.Property(e => e.OldAcademicUnityName).HasMaxLength(50);
            entity.Property(e => e.ActualAcademicUnityName).HasMaxLength(50);
            entity.Property(e => e.Action).HasMaxLength(50);
            entity.Property(e => e.ModificationDate);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.AcademicUnity).WithMany(p => p.AcademicUnityAudits).HasForeignKey(d => d.AcademicUnityId);
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<BadgeAudit>(entity =>
        {
            entity.HasKey(e => e.BadgeAuditId);
            entity.ToTable("BadgeAudit");

            entity.HasIndex(e => e.BadgeId, "IX_BadgeAudit_BadgeID");
            entity.HasIndex(e => e.UserId, "IX_BadgeAudit_UserID");

            entity.Property(e => e.BadgeId).HasColumnName("BadgeID");
            entity.Property(e => e.OldBadgeName).HasMaxLength(50);
            entity.Property(e => e.ActualBadgeName).HasMaxLength(50);
            entity.Property(e => e.OldImage);
            entity.Property(e => e.ActualImage);
            entity.Property(e => e.Action).HasMaxLength(50);
            entity.Property(e => e.ModificationDate);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Badge).WithMany(p => p.BadgeAudits).HasForeignKey(d => d.BadgeId);
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<CareerAudit>(entity =>
        {
            entity.HasKey(e => e.CareerAuditId);
            entity.ToTable("CareerAudit");

            entity.HasIndex(e => e.CareerId, "IX_CareerAudit_CareerID");
            entity.HasIndex(e => e.UserId, "IX_CareerAudit_UserID");

            entity.Property(e => e.CareerId).HasColumnName("CareerID");
            entity.Property(e => e.OldCareerName).HasMaxLength(50);
            entity.Property(e => e.ActualCareerName).HasMaxLength(50);
            entity.Property(e => e.OldDepartmentId);
            entity.Property(e => e.ActualDepartmentId);
            entity.Property(e => e.Action).HasMaxLength(50);
            entity.Property(e => e.ModificationDate);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Career).WithMany(p => p.CareerAudits).HasForeignKey(d => d.CareerId);
            entity.HasOne(d => d.Department).WithMany().HasForeignKey(d => d.OldDepartmentId);
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<DepartmentAudit>(entity =>
        {
            entity.HasKey(e => e.DepartmentAuditId);
            entity.ToTable("DepartmentAudit");

            entity.HasIndex(e => e.DepartmentId, "IX_DepartmentAudit_DepartmentID");
            entity.HasIndex(e => e.UserId, "IX_DepartmentAudit_UserID");

            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.OldDepartmentName).HasMaxLength(50);
            entity.Property(e => e.ActualDepartmentName).HasMaxLength(50);
            entity.Property(e => e.OldFacultyId);
            entity.Property(e => e.ActualFacultyId);
            entity.Property(e => e.Action).HasMaxLength(50);
            entity.Property(e => e.ModificationDate);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Faculty).WithMany().HasForeignKey(d => d.OldFacultyId);
            entity.HasOne(d => d.Department).WithMany(p => p.DepartmentAudits).HasForeignKey(d => d.DepartmentId);
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<FacultyAudit>(entity =>
        {
            entity.HasKey(e => e.FacultyAuditId);
            entity.ToTable("FacultyAudit");

            entity.HasIndex(e => e.FacultyId, "IX_FacultyAudit_FacultyID");
            entity.HasIndex(e => e.UserId, "IX_FacultyAudit_UserID");

            entity.Property(e => e.FacultyId).HasColumnName("FacultyID");
            entity.Property(e => e.OldFacultyName).HasMaxLength(50);
            entity.Property(e => e.ActualFacultyName).HasMaxLength(50);
            entity.Property(e => e.Action).HasMaxLength(50);
            entity.Property(e => e.ModificationDate);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Faculty).WithMany(p => p.FacultyAudits).HasForeignKey(d => d.FacultyId);
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<StudentAudit>(entity =>
        {
            entity.HasKey(e => e.StudentAuditId);
            entity.ToTable("StudentAudit");

            entity.HasIndex(e => e.PersonId, "IX_StudentAudit_PersonID");
            entity.HasIndex(e => e.UserId, "IX_StudentAudit_UserID");

            entity.Property(e => e.PersonId).HasColumnName("PersonID");
            entity.Property(e => e.OldScore);
            entity.Property(e => e.ActualScore);
            entity.Property(e => e.OldRank).HasMaxLength(50);
            entity.Property(e => e.ActualRank).HasMaxLength(50);
            entity.Property(e => e.Action).HasMaxLength(50);
            entity.Property(e => e.ModificationDate);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentAudits).HasForeignKey(d => d.PersonId);
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<SanctionAudit>(entity =>
        {
            entity.HasKey(e => e.SanctionAuditId);
            entity.ToTable("SanctionAudit");

            entity.HasIndex(e => e.SanctionId, "IX_SanctionAudit_SanctionID");
            entity.HasIndex(e => e.UserId, "IX_SanctionAudit_UserID");

            entity.Property(e => e.SanctionId).HasColumnName("SanctionID");
            entity.Property(e => e.OldSanctionName).HasMaxLength(50);
            entity.Property(e => e.ActualSanctionName).HasMaxLength(50);
            entity.Property(e => e.OldDescription).HasMaxLength(50);
            entity.Property(e => e.ActualDescription).HasMaxLength(50);
            entity.Property(e => e.OldPunctuation);
            entity.Property(e => e.ActualPunctuation);
            entity.Property(e => e.Action).HasMaxLength(50);
            entity.Property(e => e.ModificationDate);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Sanction).WithMany(p => p.SanctionAudits).HasForeignKey(d => d.SanctionId);
            entity.HasOne(d => d.User).WithMany().HasForeignKey(d => d.UserId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
