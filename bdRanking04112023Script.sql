USE [master]
GO
/****** Object:  Database [BDRanking]    Script Date: 4/11/2023 21:42:07 ******/
CREATE DATABASE [BDRanking]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BDRanking', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\BDRanking.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BDRanking_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\BDRanking_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [BDRanking] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BDRanking].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BDRanking] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BDRanking] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BDRanking] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BDRanking] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BDRanking] SET ARITHABORT OFF 
GO
ALTER DATABASE [BDRanking] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BDRanking] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BDRanking] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BDRanking] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BDRanking] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BDRanking] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BDRanking] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BDRanking] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BDRanking] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BDRanking] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BDRanking] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BDRanking] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BDRanking] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BDRanking] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BDRanking] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BDRanking] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [BDRanking] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BDRanking] SET RECOVERY FULL 
GO
ALTER DATABASE [BDRanking] SET  MULTI_USER 
GO
ALTER DATABASE [BDRanking] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BDRanking] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BDRanking] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BDRanking] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BDRanking] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BDRanking] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [BDRanking] SET QUERY_STORE = ON
GO
ALTER DATABASE [BDRanking] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [BDRanking]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AcademicUnity]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AcademicUnity](
	[AcademicUnityID] [int] IDENTITY(1,1) NOT NULL,
	[AcademicUnityName] [nvarchar](50) NOT NULL,
	[Status] [tinyint] NOT NULL,
	[RegisterDate] [datetime2](7) NULL,
 CONSTRAINT [PK_AcademicUnity] PRIMARY KEY CLUSTERED 
(
	[AcademicUnityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AcademicUnityAudit]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AcademicUnityAudit](
	[AcademicUnityAuditID] [int] IDENTITY(1,1) NOT NULL,
	[AcademicUnityID] [int] NOT NULL,
	[OldAcademicUnityName] [nvarchar](50) NOT NULL,
	[ActualAcademicUnityName] [nvarchar](50) NOT NULL,
	[Action] [nvarchar](50) NOT NULL,
	[ModificationDate] [datetime] NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_AcademicUnityAudit] PRIMARY KEY CLUSTERED 
(
	[AcademicUnityAuditID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Badge]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Badge](
	[BadgeID] [int] IDENTITY(1,1) NOT NULL,
	[BadgeName] [varchar](70) NOT NULL,
	[Image] [nvarchar](max) NOT NULL,
	[Status] [tinyint] NOT NULL,
	[RegisterDate] [date] NOT NULL,
 CONSTRAINT [PK_Badges] PRIMARY KEY CLUSTERED 
(
	[BadgeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BadgeAudit]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BadgeAudit](
	[BadgeAuditID] [int] IDENTITY(1,1) NOT NULL,
	[BadgeID] [int] NOT NULL,
	[OldBadgeName] [nvarchar](50) NOT NULL,
	[ActualBadgeName] [nvarchar](50) NOT NULL,
	[OldImage] [nvarchar](max) NOT NULL,
	[ActualImage] [nvarchar](max) NOT NULL,
	[Action] [nvarchar](50) NOT NULL,
	[ModificationDate] [datetime] NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_BadgeAudit] PRIMARY KEY CLUSTERED 
(
	[BadgeAuditID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Career]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Career](
	[CareerID] [int] IDENTITY(1,1) NOT NULL,
	[CareerName] [nvarchar](50) NOT NULL,
	[DepartmentID] [int] NOT NULL,
	[Status] [tinyint] NOT NULL,
	[RegisterDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Career] PRIMARY KEY CLUSTERED 
(
	[CareerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CareerAudit]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CareerAudit](
	[CareerAuditID] [int] IDENTITY(1,1) NOT NULL,
	[CareerID] [int] NOT NULL,
	[OldCareerName] [nvarchar](50) NOT NULL,
	[ActualCareerName] [nvarchar](50) NOT NULL,
	[OldDepartmentID] [int] NOT NULL,
	[ActualDepartmentID] [int] NOT NULL,
	[Action] [nvarchar](50) NOT NULL,
	[ModificationDate] [datetime] NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_CareerAudit] PRIMARY KEY CLUSTERED 
(
	[CareerAuditID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[DepartmentID] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](50) NOT NULL,
	[FacultyID] [int] NOT NULL,
	[Status] [tinyint] NOT NULL,
	[RegisterDate] [datetime2](7) NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DepartmentAudit]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DepartmentAudit](
	[DepartmentAuditID] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentID] [int] NOT NULL,
	[OldDepartmentName] [nvarchar](50) NOT NULL,
	[ActualDepartmentName] [nvarchar](50) NOT NULL,
	[OldFacultyID] [int] NOT NULL,
	[ActualFacultyID] [int] NOT NULL,
	[Action] [nvarchar](50) NOT NULL,
	[ModificationDate] [datetime] NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_DepartmentAudit] PRIMARY KEY CLUSTERED 
(
	[DepartmentAuditID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Faculty]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Faculty](
	[FacultyID] [int] IDENTITY(1,1) NOT NULL,
	[FacultyName] [nvarchar](50) NOT NULL,
	[Status] [tinyint] NOT NULL,
	[RegisterDate] [datetime] NULL,
 CONSTRAINT [PK_Faculty] PRIMARY KEY CLUSTERED 
(
	[FacultyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FacultyAudit]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FacultyAudit](
	[FacultyAuditID] [int] IDENTITY(1,1) NOT NULL,
	[FacultyID] [int] NOT NULL,
	[OldFacultyName] [nvarchar](50) NOT NULL,
	[ActualFacultyName] [nvarchar](50) NOT NULL,
	[Action] [nvarchar](50) NOT NULL,
	[ModificationDate] [datetime] NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_FacultyAudit] PRIMARY KEY CLUSTERED 
(
	[FacultyAuditID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Person]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Person](
	[PersonID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[SecondLastName] [nvarchar](50) NULL,
	[AcademicUnityID] [int] NOT NULL,
	[CareerID] [int] NOT NULL,
	[Status] [tinyint] NOT NULL,
	[RegisterDate] [datetime2](7) NULL,
	[Role] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Username] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[ExpireDateAdmin] [datetime] NULL,
 CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED 
(
	[PersonID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sanction]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sanction](
	[SanctionID] [int] IDENTITY(1,1) NOT NULL,
	[SanctionName] [nvarchar](60) NOT NULL,
	[Description] [nvarchar](150) NOT NULL,
	[punctuation] [float] NOT NULL,
	[RegisterDate] [datetime2](7) NOT NULL,
	[Status] [tinyint] NOT NULL,
 CONSTRAINT [PK_Sanctions] PRIMARY KEY CLUSTERED 
(
	[SanctionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanctionAudit]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanctionAudit](
	[SanctionAuditID] [int] IDENTITY(1,1) NOT NULL,
	[SanctionID] [int] NOT NULL,
	[OldSanctionName] [nvarchar](50) NOT NULL,
	[ActualSanctionName] [nvarchar](50) NOT NULL,
	[OldDescription] [nvarchar](50) NOT NULL,
	[ActualDescription] [nvarchar](50) NOT NULL,
	[OldPunctuation] [float] NOT NULL,
	[ActualPunctuation] [float] NOT NULL,
	[Action] [nvarchar](50) NOT NULL,
	[ModificationDate] [datetime] NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_SanctionAudit] PRIMARY KEY CLUSTERED 
(
	[SanctionAuditID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Student]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Student](
	[PersonID] [int] NOT NULL,
	[Score] [int] NOT NULL,
	[Rank] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[PersonID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StudentAudit]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentAudit](
	[StudentAuditID] [int] IDENTITY(1,1) NOT NULL,
	[PersonID] [int] NOT NULL,
	[OldScore] [int] NOT NULL,
	[ActualScore] [int] NOT NULL,
	[OldRank] [nvarchar](50) NOT NULL,
	[ActualRank] [nvarchar](50) NOT NULL,
	[Action] [nvarchar](50) NOT NULL,
	[ModificationDate] [datetime] NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_StudentAudit] PRIMARY KEY CLUSTERED 
(
	[StudentAuditID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StudentBadge]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentBadge](
	[BadgeID] [int] NOT NULL,
	[PersonID] [int] NOT NULL,
	[AssignmentDate] [date] NOT NULL,
 CONSTRAINT [PK_StudentBadge] PRIMARY KEY CLUSTERED 
(
	[BadgeID] ASC,
	[PersonID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StudentSanction]    Script Date: 4/11/2023 21:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StudentSanction](
	[StudentSanctionID] [int] IDENTITY(1,1) NOT NULL,
	[SanctionID] [int] NOT NULL,
	[PersonID] [int] NOT NULL,
	[AssignmentDate] [date] NOT NULL,
 CONSTRAINT [PK_StudentSanction_1] PRIMARY KEY CLUSTERED 
(
	[StudentSanctionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_Career_DepartmentID]    Script Date: 4/11/2023 21:42:07 ******/
CREATE NONCLUSTERED INDEX [IX_Career_DepartmentID] ON [dbo].[Career]
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Department_FacultyID]    Script Date: 4/11/2023 21:42:07 ******/
CREATE NONCLUSTERED INDEX [IX_Department_FacultyID] ON [dbo].[Department]
(
	[FacultyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Person_AcademicUnityID]    Script Date: 4/11/2023 21:42:07 ******/
CREATE NONCLUSTERED INDEX [IX_Person_AcademicUnityID] ON [dbo].[Person]
(
	[AcademicUnityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Person_CareerID]    Script Date: 4/11/2023 21:42:07 ******/
CREATE NONCLUSTERED INDEX [IX_Person_CareerID] ON [dbo].[Person]
(
	[CareerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AcademicUnity] ADD  CONSTRAINT [DF_AcademicUnity_RegisterDate]  DEFAULT (getdate()) FOR [RegisterDate]
GO
ALTER TABLE [dbo].[Badge] ADD  CONSTRAINT [DF_Table_1_status]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Badge] ADD  CONSTRAINT [DF_Badges_RegisterDate]  DEFAULT (getdate()) FOR [RegisterDate]
GO
ALTER TABLE [dbo].[Faculty] ADD  CONSTRAINT [DF_Faculty_RegisterDate]  DEFAULT (getdate()) FOR [RegisterDate]
GO
ALTER TABLE [dbo].[Sanction] ADD  CONSTRAINT [DF_Sanction_RegisterDate]  DEFAULT (getdate()) FOR [RegisterDate]
GO
ALTER TABLE [dbo].[Sanction] ADD  CONSTRAINT [DF_Sanction_Status]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[StudentBadge] ADD  CONSTRAINT [DF_StudentBadge_AssignmentDate]  DEFAULT (getdate()) FOR [AssignmentDate]
GO
ALTER TABLE [dbo].[StudentSanction] ADD  CONSTRAINT [DF_StudentSanction_RegisterDate]  DEFAULT (getdate()) FOR [AssignmentDate]
GO
ALTER TABLE [dbo].[AcademicUnityAudit]  WITH CHECK ADD  CONSTRAINT [FK_AcademicUnityAudit_AcademicUnity] FOREIGN KEY([AcademicUnityID])
REFERENCES [dbo].[AcademicUnity] ([AcademicUnityID])
GO
ALTER TABLE [dbo].[AcademicUnityAudit] CHECK CONSTRAINT [FK_AcademicUnityAudit_AcademicUnity]
GO
ALTER TABLE [dbo].[BadgeAudit]  WITH CHECK ADD  CONSTRAINT [FK_BadgeAudit_Badge] FOREIGN KEY([BadgeID])
REFERENCES [dbo].[Badge] ([BadgeID])
GO
ALTER TABLE [dbo].[BadgeAudit] CHECK CONSTRAINT [FK_BadgeAudit_Badge]
GO
ALTER TABLE [dbo].[Career]  WITH CHECK ADD  CONSTRAINT [FK_Career_Department_DepartmentID] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([DepartmentID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Career] CHECK CONSTRAINT [FK_Career_Department_DepartmentID]
GO
ALTER TABLE [dbo].[CareerAudit]  WITH CHECK ADD  CONSTRAINT [FK_CareerAudit_Career] FOREIGN KEY([CareerID])
REFERENCES [dbo].[Career] ([CareerID])
GO
ALTER TABLE [dbo].[CareerAudit] CHECK CONSTRAINT [FK_CareerAudit_Career]
GO
ALTER TABLE [dbo].[Department]  WITH CHECK ADD  CONSTRAINT [FK_Department_Faculty_FacultyID] FOREIGN KEY([FacultyID])
REFERENCES [dbo].[Faculty] ([FacultyID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Department] CHECK CONSTRAINT [FK_Department_Faculty_FacultyID]
GO
ALTER TABLE [dbo].[DepartmentAudit]  WITH CHECK ADD  CONSTRAINT [FK_DepartmentAudit_Department] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([DepartmentID])
GO
ALTER TABLE [dbo].[DepartmentAudit] CHECK CONSTRAINT [FK_DepartmentAudit_Department]
GO
ALTER TABLE [dbo].[FacultyAudit]  WITH CHECK ADD  CONSTRAINT [FK_FacultyAudit_Faculty] FOREIGN KEY([FacultyID])
REFERENCES [dbo].[Faculty] ([FacultyID])
GO
ALTER TABLE [dbo].[FacultyAudit] CHECK CONSTRAINT [FK_FacultyAudit_Faculty]
GO
ALTER TABLE [dbo].[Person]  WITH CHECK ADD  CONSTRAINT [FK_Person_AcademicUnity_AcademicUnityID] FOREIGN KEY([AcademicUnityID])
REFERENCES [dbo].[AcademicUnity] ([AcademicUnityID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [FK_Person_AcademicUnity_AcademicUnityID]
GO
ALTER TABLE [dbo].[Person]  WITH CHECK ADD  CONSTRAINT [FK_Person_Career_CareerID] FOREIGN KEY([CareerID])
REFERENCES [dbo].[Career] ([CareerID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [FK_Person_Career_CareerID]
GO
ALTER TABLE [dbo].[SanctionAudit]  WITH CHECK ADD  CONSTRAINT [FK_SanctionAudit_Sanction] FOREIGN KEY([SanctionID])
REFERENCES [dbo].[Sanction] ([SanctionID])
GO
ALTER TABLE [dbo].[SanctionAudit] CHECK CONSTRAINT [FK_SanctionAudit_Sanction]
GO
ALTER TABLE [dbo].[Student]  WITH CHECK ADD  CONSTRAINT [FK_Student_Person_PersonID] FOREIGN KEY([PersonID])
REFERENCES [dbo].[Person] ([PersonID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Student] CHECK CONSTRAINT [FK_Student_Person_PersonID]
GO
ALTER TABLE [dbo].[StudentAudit]  WITH CHECK ADD  CONSTRAINT [FK_StudentAudit_Student] FOREIGN KEY([PersonID])
REFERENCES [dbo].[Student] ([PersonID])
GO
ALTER TABLE [dbo].[StudentAudit] CHECK CONSTRAINT [FK_StudentAudit_Student]
GO
ALTER TABLE [dbo].[StudentBadge]  WITH CHECK ADD  CONSTRAINT [FK_StudentBadge_Badge1] FOREIGN KEY([BadgeID])
REFERENCES [dbo].[Badge] ([BadgeID])
GO
ALTER TABLE [dbo].[StudentBadge] CHECK CONSTRAINT [FK_StudentBadge_Badge1]
GO
ALTER TABLE [dbo].[StudentBadge]  WITH CHECK ADD  CONSTRAINT [FK_StudentBadge_Student1] FOREIGN KEY([PersonID])
REFERENCES [dbo].[Student] ([PersonID])
GO
ALTER TABLE [dbo].[StudentBadge] CHECK CONSTRAINT [FK_StudentBadge_Student1]
GO
ALTER TABLE [dbo].[StudentSanction]  WITH CHECK ADD  CONSTRAINT [FK_StudentSanction_Sanction1] FOREIGN KEY([SanctionID])
REFERENCES [dbo].[Sanction] ([SanctionID])
GO
ALTER TABLE [dbo].[StudentSanction] CHECK CONSTRAINT [FK_StudentSanction_Sanction1]
GO
ALTER TABLE [dbo].[StudentSanction]  WITH CHECK ADD  CONSTRAINT [FK_StudentSanction_Student] FOREIGN KEY([PersonID])
REFERENCES [dbo].[Student] ([PersonID])
GO
ALTER TABLE [dbo].[StudentSanction] CHECK CONSTRAINT [FK_StudentSanction_Student]
GO
USE [master]
GO
ALTER DATABASE [BDRanking] SET  READ_WRITE 
GO
