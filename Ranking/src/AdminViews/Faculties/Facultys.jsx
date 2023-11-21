import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/tables.css';

function Facultys() {
  const [faculties, setFaculties] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [facultyIdToDelete, setFacultyIdToDelete] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false); // Nuevo estado

  useEffect(() => {
    fetch('https://localhost:7103/api/Faculties')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((unity) => {
          const formattedDate = new Date(unity.registerDate).toLocaleDateString('en-GB');
          return { ...unity, registerDate: formattedDate };
        });

        // Filtra solo los registros con status igual a 1
        const filteredData = formattedData.filter((faculty) => faculty.status === 1);
        const sortedData = filteredData.sort((a, b) => a.facultyName.localeCompare(b.facultyName));
        setFaculties(sortedData);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [statusChanged]); // Carga la lista nuevamente cuando statusChanged cambia

  const handleDelete = (facultyId) => {
    setFacultyIdToDelete(facultyId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (facultyIdToDelete) {
      const facultyToUpdate = faculties.find((faculty) => faculty.facultyId === facultyIdToDelete);

      if (!facultyToUpdate) {
        console.error('No se encontró la facultad a eliminar.');
        return;
      }

      const updatedData = {
        facultyId: facultyIdToDelete,
        facultyName: facultyToUpdate.facultyName,
        status: 0, // Cambia el estado a 0 para la eliminación lógica
      };

      fetch(`https://localhost:7103/api/Faculties/${facultyIdToDelete}`, {
        method: 'PUT', // Cambia el método a PUT para la eliminación lógica
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.ok) {
            // Crea un objeto de auditoría para la eliminación lógica
            const facultyAuditData = {
              facultyId: facultyIdToDelete,
              oldFacultyName: facultyToUpdate.facultyName,
              actualFacultyName: facultyToUpdate.facultyName,
              action: 'Delete',
              userID: JSON.parse(sessionStorage.userData).userId,
            };

            // Envía los datos de auditoría a un endpoint de API para su registro
            return fetch('https://localhost:7103/api/FacultyAudits', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(facultyAuditData),
            });
          } else {
            console.error('Error al cambiar el estado de la facultad: ', response.statusText);
          }
        })
        .then((auditResponse) => {
          if (auditResponse && auditResponse.ok) {
            setStatusChanged(!statusChanged); // Cambia el estado para recargar la lista
          } else {
            console.error('Error al agregar FacultyAudit');
          }
        })
        .catch((error) => {
          console.error('Error al cambiar el estado de la facultad: ', error);
        });
    }
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Facultades</h2><br/>
            <a href='/CreateFaculties' className="btn btn-success mb-3 btnAdd">Añadir Facultad</a>
            <table className="table table-responsive text-center mx-5">
              <thead>
                <tr>
                  <th>Nombre de la Facultad</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((faculty) => (
                  <tr key={faculty.facultyId}>
                    <td>{faculty.facultyName}</td>
                    <td>{faculty.registerDate}</td>
                    <td>
                      <a href={`/UpdateFaculties/${faculty.facultyId}`} className="btn btn-sm btn-warning">Editar</a>
                      <button onClick={() => handleDelete(faculty.facultyId)} className="btn btn-sm btn-danger ms-3">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres eliminar esta facultad?</Modal.Body>
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

export default Facultys;
