import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/tables.css';

function Sanctions() {
  const [sanctions, setSanctions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sanctionIdToDelete, setSanctionIdToDelete] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false); // Nuevo estado

  useEffect(() => {
    fetch('https://localhost:7103/api/Sanctions')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((unity) => {
          const formattedDate = new Date(unity.registerDate).toLocaleDateString('en-GB');
          return { ...unity, registerDate: formattedDate };
        });

        // Filtra solo los registros con status igual a 1
        const filteredData = formattedData.filter((sanction) => sanction.status === 1);

        const sortedData = filteredData.sort((a, b) => a.sanctionName.localeCompare(b.sanctionName));
        setSanctions(sortedData);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [statusChanged]); // Carga la lista nuevamente cuando statusChanged cambia

  const handleDelete = (sanctionId) => {
    setSanctionIdToDelete(sanctionId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (sanctionIdToDelete) {
      const sanctionToUpdate = sanctions.find((sanction) => sanction.sanctionId === sanctionIdToDelete);

      if (!sanctionToUpdate) {
        console.error('No se encontró la sanción a eliminar.');
        return;
      }

      const updatedData = {
        sanctionId: sanctionIdToDelete,
        sanctionName: sanctionToUpdate.sanctionName,
        description: sanctionToUpdate.description,
        punctuation: sanctionToUpdate.punctuation,
        status: 0, // Cambia el estado a 0 para la eliminación lógica
      };

      fetch(`https://localhost:7103/api/Sanctions/${sanctionIdToDelete}`, {
        method: 'PUT', // Cambia el método a PUT para la eliminación lógica
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.ok) {
            setStatusChanged(!statusChanged); // Cambia el estado para recargar la lista
          } else {
            console.error('Error al cambiar el estado de la sanción: ', response.statusText);
          }
        })
        .then(() => {
          // Crear un objeto de auditoría para la eliminación lógica
          const sanctionAuditData = {
            sanctionId: sanctionIdToDelete,
            oldSanctionName: sanctionToUpdate.sanctionName,
            actualSanctionName: sanctionToUpdate.sanctionName,
            oldDescription: sanctionToUpdate.description,
            actualDescription: sanctionToUpdate.description,
            oldPunctuation: sanctionToUpdate.punctuation,
            actualPunctuation: sanctionToUpdate.punctuation,
            action: 'Delete',
            userID: JSON.parse(sessionStorage.userData).userId,
          };

          // Envía los datos de auditoría a un endpoint de API para su registro
          return fetch('https://localhost:7103/api/SanctionAudits', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanctionAuditData),
          });
        })
        .then((auditResponse) => {
          if (auditResponse.ok) {
            setStatusChanged(!statusChanged); // Cambia el estado para recargar la lista nuevamente
          } else {
            console.error('Error al agregar SanctionAudit');
          }
        })
        .catch((error) => {
          console.error('Error al cambiar el estado de la sanción: ', error);
        });
    }
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Sanciones</h2><br/>
            <a href='/CreateSanction' className="btn btn-success mb-3 btnAdd">Añadir Sanción</a>
            <table className="table table-responsive text-center mx-5">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Puntuación</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sanctions.map((sanction) => (
                  <tr key={sanction.sanctionId}>
                    <td>{sanction.sanctionName}</td>
                    <td>{sanction.description}</td>
                    <td>{sanction.punctuation}</td>
                    <td>{sanction.registerDate}</td>
                    <td>
                      <a href={`/UpdateSanction/${sanction.sanctionId}`} className="btn btn-sm btn-warning">Editar</a>
                      <button onClick={() => handleDelete(sanction.sanctionId)} className="btn btn-sm btn-danger ms-3">
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
        <Modal.Body>¿Estás seguro de que quieres eliminar esta sanción?</Modal.Body>
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

export default Sanctions;
