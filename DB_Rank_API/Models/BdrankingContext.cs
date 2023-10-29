using System;
using System.Collections.Generic;
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

    public virtual DbSet<Professor> Professors { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Sanction> Sanctions { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=ZEDSKANPC;Initial Catalog=BDRanking;TrustServerCertificate=True;Integrated Security=True");

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

        modelBuilder.Entity<Professor>(entity =>
        {
            entity.HasKey(e => e.PersonId);

            entity.ToTable("Professor");

            entity.Property(e => e.PersonId)
                .ValueGeneratedNever()
                .HasColumnName("PersonID");

            entity.HasOne(d => d.Person).WithOne(p => p.Professor).HasForeignKey<Professor>(d => d.PersonId);
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.ProjectsId);

            entity.HasIndex(e => e.StudentPersonId, "IX_Projects_StudentPersonID");

            entity.Property(e => e.ProjectsId).HasColumnName("ProjectsID");
            entity.Property(e => e.Achievment).HasColumnName("achievment");
            entity.Property(e => e.ProjectName).HasMaxLength(150);
            entity.Property(e => e.Punctuation).HasColumnName("punctuation");
            entity.Property(e => e.StudentPersonId).HasColumnName("StudentPersonID");
            entity.Property(e => e.StudentsId).HasColumnName("StudentsID");

            entity.HasOne(d => d.StudentPerson).WithMany(p => p.Projects).HasForeignKey(d => d.StudentPersonId);
        });

        modelBuilder.Entity<Sanction>(entity =>
        {
            entity.HasKey(e => e.SanctionsId);

            entity.HasIndex(e => e.StudentPersonId, "IX_Sanctions_StudentPersonID");

            entity.Property(e => e.SanctionsId).HasColumnName("SanctionsID");
            entity.Property(e => e.Description).HasMaxLength(150);
            entity.Property(e => e.Punctuation).HasColumnName("punctuation");
            entity.Property(e => e.StudentPersonId).HasColumnName("StudentPersonID");
            entity.Property(e => e.StudentsId).HasColumnName("StudentsID");

            entity.HasOne(d => d.StudentPerson).WithMany(p => p.Sanctions).HasForeignKey(d => d.StudentPersonId);
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.PersonId);

            entity.ToTable("Student");

            entity.Property(e => e.PersonId)
                .ValueGeneratedNever()
                .HasColumnName("PersonID");

            entity.HasOne(d => d.Person).WithOne(p => p.Student).HasForeignKey<Student>(d => d.PersonId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
