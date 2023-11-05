import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/tables.css';

function Academic() {
  const [academicUnities, setAcademicUnities] = useState([]);
  const [unitToDelete, setUnitToDelete] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false); // Nuevo estado

  useEffect(() => {
    fetch('https://localhost:7103/api/AcademicUnities')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((unity) => {
          const formattedDate = new Date(unity.registerDate).toLocaleDateString('en-GB');
          return { ...unity, registerDate: formattedDate };
        });
        const sortedData = formattedData.sort((a, b) => a.academicUnityName.localeCompare(b.academicUnityName));
        setAcademicUnities(sortedData);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [statusChanged]);

  const openDeleteModal = (academicUnityId) => {
    setUnitToDelete(academicUnityId);
  };

  const closeDeleteModal = () => {
    setUnitToDelete(null);
  };

  const handleDelete = () => {
    if (unitToDelete) {
      const academicUnityToUpdate = academicUnities.find(unity => unity.academicUnityId === unitToDelete);
  
      if (!academicUnityToUpdate) {
        console.error('No se encontró la unidad académica a eliminar.');
        return;
      }

      const updatedData = {
        academicUnityId: unitToDelete,
        academicUnityName: academicUnityToUpdate.academicUnityName,
        status: 0,
      };

      fetch(`https://localhost:7103/api/AcademicUnities/${unitToDelete}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.ok) {
            // Cambia el estado de la unidad académica en la lista
            setAcademicUnities((prevAcademicUnities) =>
              prevAcademicUnities.map((unity) =>
                unity.academicUnityId === unitToDelete ? { ...unity, status: 0 } : unity
              )
            );

            // Crea un objeto de auditoría para la eliminación lógica
            const academicAuditData = {
              academicUnityId: unitToDelete,
              oldAcademicUnityName: academicUnityToUpdate.academicUnityName,
              actualAcademicUnityName: academicUnityToUpdate.academicUnityName,
              action: 'Delete',
              userID: JSON.parse(sessionStorage.userData).userId,
            };

            // Envía los datos de auditoría a un endpoint de API para su registro
            return fetch('https://localhost:7103/api/AcademicUnityAudits', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(academicAuditData),
            });
          } else {
            console.error('Error al cambiar el estado de la unidad académica: ', response.text());
          }
        })
        .then((auditResponse) => {
          if (auditResponse && auditResponse.ok) {
            setStatusChanged(!statusChanged); // Cambia el estado para recargar la lista
          } else {
            console.error('Error al agregar AcademicUnityAudit');
          }
        })
        .catch((error) => {
          console.error('Error al cambiar el estado de la unidad académica: ', error);
        });
      }
  
      closeDeleteModal();
    };

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="font-weight-bold">Sedes</h2><br />
              <a href='/CreateAcademicUnits' className="btn btn-success mb-3 btnAdd">
                Añadir Sede
              </a>
              <table className="table table-responsive text-center mx-5">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha de Registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {academicUnities
                    .filter((academicUnity) => academicUnity.status === 1)
                    .map((academicUnity) => (
                      <tr key={academicUnity.academicUnityId}>
                        <td>{academicUnity.academicUnityName}</td>
                        <td>{academicUnity.registerDate}</td>
                        <td>
                          <a href={`/UpdateAcademicUnits/${academicUnity.academicUnityId}`} className="btn btn-warning">
                            Editar
                          </a>
                          <Button
                            variant="danger"
                            className="ms-3"
                            onClick={() => openDeleteModal(academicUnity.academicUnityId)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    
        <Modal show={unitToDelete !== null} onHide={closeDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que quieres eliminar esta sede?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default Academic;
