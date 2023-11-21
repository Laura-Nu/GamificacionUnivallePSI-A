import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/tables.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [careers, setCareers] = useState({});
  const [academicUnities, setAcademicUnities] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [personIdToDelete, setPersonIdToDelete] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false);

  useEffect(() => {
    fetch('https://localhost:7103/api/People')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.lastName.localeCompare(b.lastName));
        setStudents(sortedData);
      })
      .catch((error) => console.error('Error fetching students: ', error));
  }, [statusChanged]);

  useEffect(() => {
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
  }, [statusChanged]);

  const handleDelete = (personId) => {
    setPersonIdToDelete(personId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (personIdToDelete) {
      const studentToDelete = students.find((student) => student.personId === personIdToDelete);

      if (!studentToDelete) {
        console.error('No se encontró el estudiante a eliminar.');
        return;
      }

      const updatedData = {
        ...studentToDelete,
        status: 0, // Cambia el estado a 0 para la eliminación lógica
      };

      fetch(`https://localhost:7103/api/People/${personIdToDelete}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.ok) {
            // Cambia el estado del estudiante en la lista
            setStudents((prevStudents) =>
              prevStudents.map((student) =>
                student.personId === personIdToDelete ? { ...student, status: 0 } : student
              )
            );

            // Crea un objeto de auditoría para la eliminación lógica
            const studentAuditData = {
              personId: personIdToDelete,
              oldScore: updatedData.student.score,
              actualScore: updatedData.student.score,
              oldRank: updatedData.student.rank,
              actualRank: updatedData.student.rank,
              action: 'Delete',
              userID: JSON.parse(sessionStorage.userData).userId,
            };
            // Envía los datos de auditoría a un endpoint de API para su registro
            return fetch('https://localhost:7103/api/StudentAudits', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(studentAuditData),
            });
          } else {
            console.error('Error al cambiar el estado del estudiante: ', response.text());
          }
        })
        .then((auditResponse) => {
          if (auditResponse && auditResponse.ok) {
            setStatusChanged(!statusChanged); // Cambia el estado para recargar la lista
          } else {
            console.error('Error al agregar StudentAudit');
          }
        })
        .catch((error) => {
          console.error('Error al cambiar el estado del estudiante: ', error);
        });
    }
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Estudiantes</h2><br />
            <a href='/AddFromExcel' className="btn btn-success mb-3">Añadir Estudiantes con excel</a>
            <a href='/CreateStudent' className="btn btn-success mb-3 btnAdd">Añadir Estudiante</a>
            <table className="table table-responsive mx-5">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Carrera</th>
                  <th>Sede</th>
                  <th>Rango</th>
                  <th>Puntaje</th>
                  <th className='text-center'>Añadir</th>
                  <th className='text-center'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  if (student.role === "Student" && student.status === 1) {
                    return (
                      <tr key={student.personId}>
                        <td>{student.lastName} {student.secondLastName}, {student.firstName}</td>
                        <td>{careers[student.careerId]}</td>
                        <td>{academicUnities[student.academicUnityId]}</td>
                        <td>{student.student && student.student.rank}</td>
                        <td>{student.student && student.student.score}</td>
                        <td>
                          <a href={`/AddBadgeToStudent/${student.personId}`} className="btn btn-sm btn-info">Insignia</a>
                          <a href={`/AddSanctionToStudent/${student.personId}`} className="btn btn-sm btn-dark ms-3">Sanción</a>
                          <a href={`/AddAchievementToStudent/${student.personId}`} className="btn btn-sm btn-success ms-3">Logro</a>
                        </td>
                        <td>
                          <a href={`/UpdateStudent/${student.personId}`} className="btn btn-sm btn-warning">Editar</a>
                          <button onClick={() => handleDelete(student.personId)} className="btn btn-sm btn-danger ms-3">
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres eliminar este estudiante?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Students;
