import React, { useState, useEffect } from 'react';
import '../../Styles/tables.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [careers, setCareers] = useState({});
  const [academicUnities, setAcademicUnities] = useState({});

  useEffect(() => {
    fetch('https://localhost:7103/api/People')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students: ', error));

    fetch('https://localhost:7103/api/Careers')
      .then((response) => response.json())
      .then((data) => {
        const careerMap = {};
        data.forEach((career) => {
          careerMap[career.careerId] = career.careerName;
        });
        setCareers(careerMap);
      })
      .catch((error) => console.error('Error fetching careers: ', error));

    fetch('https://localhost:7103/api/AcademicUnities')
      .then((response) => response.json())
      .then((data) => {
        const academicUnityMap = {};
        data.forEach((academicUnity) => {
          academicUnityMap[academicUnity.academicUnityId] = academicUnity.academicUnityName;
        });
        setAcademicUnities(academicUnityMap);
      })
      .catch((error) => console.error('Error fetching academic unities: ', error));
  }, []);

  const handleDelete = (personId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este estudiante?");
    if (confirmDelete) {
      fetch(`https://localhost:7103/api/People/${personId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setStudents((prevStudents) =>
              prevStudents.filter((student) => student.personId !== personId)
            );
          } else {
            console.error('Error al eliminar el estudiante: ', response.statusText);
          }
        })
        .catch((error) => console.error('Error al eliminar el estudiante: ', error));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Estudiantes</h2>
            <h4>Lista de estudiantes</h4>
            <a href='/CreateStudent' className="btn btn-success mb-3 btnAdd">Añadir Estudiante</a>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Primer Apellido</th>
                  <th>Segundo Apellido</th>
                  <th>Rango</th>
                  <th>Puntaje</th>
                  <th>Carrera</th>
                  <th>Unidad Académica</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  if (student.role === "Student") {
                    return (
                      <tr key={student.personId}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.secondLastName}</td>
                        <td>{student.student && student.student.rank}</td>
                        <td>{student.student && student.student.score}</td>
                        <td>{careers[student.careerId]}</td>
                        <td>{academicUnities[student.academicUnityId]}</td>
                        <td>
                          <a href={`/UpdateStudent/${student.personId}`} className="btn btn-sm btn-warning">Editar</a>
                          <button
                            onClick={() => handleDelete(student.personId)}
                            className="btn btn-sm btn-danger"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;