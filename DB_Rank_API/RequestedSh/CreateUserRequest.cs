namespace DB_Rank_API.RequestedSh
{
    public class CreateUserRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SecondLastName { get; set; }
        public int AcademicUnityId { get; set; }
        public int CareerId { get; set; }
<<<<<<< HEAD
        public byte Status { get; set; }
        public DateTime RegisterDate { get; set; }
=======
        public byte Status { get; set; } = 1;
        public DateTime RegisterDate { get; set; } = DateTime.Now;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b
        public string Role { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
<<<<<<< HEAD

        // Propiedades adicionales para las relaciones 1 a 1 (Student, Professor, etc.)
        public StudentRequest Student { get; set; }
        public ProfessorRequest Professor { get; set; }

        // Otras propiedades para las relaciones 1 a 1 si es necesario


    }

   
    public class StudentRequest
    {
        public int Rank { get; set; }
=======
        public DateTime? ExpireDateAdmin { get; set; }
        // Propiedades adicionales para las relaciones 1 a 1 (Student, Professor, etc.)
        public StudentRequest? Student { get; set; }

        // Otras propiedades para las relaciones 1 a 1 si es necesario
    }

    public class StudentRequest
    {
        public string Rank { get; set; } = null!;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b
        public int Score { get; set; }

        // Otras propiedades para Student si es necesario
    }
<<<<<<< HEAD

    public class ProfessorRequest
    {
        // Propiedades para Professor si es necesario
    }

=======
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b
}
