import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/tables.css';

function Badges() {
  const [badges, setBadges] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [badgeIdToDelete, setBadgeIdToDelete] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false); // Nuevo estado

  useEffect(() => {
    fetch('https://localhost:7103/api/Badges')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((badge) => {
          const formattedDate = new Date(badge.registerDate).toLocaleDateString('en-GB');
          return { ...badge, registerDate: formattedDate };
        });
        const sortedData = formattedData.sort((a, b) => a.badgeName.localeCompare(b.badgeName));
        setBadges(sortedData);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [statusChanged]);

  const handleDelete = (badgeId) => {
    setBadgeIdToDelete(badgeId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (badgeIdToDelete) {
      const badgeToUpdate = badges.find((badge) => badge.badgeId === badgeIdToDelete);

      if (!badgeToUpdate) {
        console.error('No se encontró la insignia a eliminar.');
        return;
      }

      const updatedData = {
        badgeId: badgeIdToDelete,
        badgeName: badgeToUpdate.badgeName,
        image: badgeToUpdate.image,
        status: 0,
      };

      fetch(`https://localhost:7103/api/Badges/${badgeIdToDelete}`, {
        method: 'PUT', // Cambiamos el método a PUT
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.ok) {
            setBadges((prevBadges) =>
              prevBadges.map((badge) =>
                badge.badgeId === badgeIdToDelete ? { ...badge, status: 0 } : badge
              )
            );

            // Crea un objeto de auditoría para la eliminación lógica
            const badgeAuditData = {
              badgeId: badgeIdToDelete,
              oldBadgeName: badgeToUpdate.badgeName,
              actualBadgeName: badgeToUpdate.badgeName,
              oldImage: badgeToUpdate.image,
              actualImage: badgeToUpdate.image,
              action: 'Delete',
              userID: JSON.parse(sessionStorage.userData).userId,
            };

            // Envía los datos de auditoría a un endpoint de API para su registro
            return fetch('https://localhost:7103/api/BadgeAudits', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(badgeAuditData),
            });
          } else {
            console.error('Error al cambiar el estado de la insignia: ', response.text());
          }
        })
        .then((auditResponse) => {
          if (auditResponse && auditResponse.ok) {
            setStatusChanged(!statusChanged); // Cambia el estado para recargar la lista
          } else {
            console.error('Error al agregar BadgeAudit');
          }
        })
        .catch((error) => {
          console.error('Error al cambiar el estado de la insignia: ', error);
        });
    }
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Insignias</h2><br />
            <a href='/CreateBadges' className="btn btn-success mb-3 btnAdd">
              Añadir Insignia
            </a>
            <table className="table table-responsive text-center mx-5">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {badges
                  .filter((badge) => badge.status === 1)
                  .map((badge) => (
                    <tr key={badge.badgeId}>
                      <td>{badge.badgeName}</td>
                      <td className="thumbnail-cell">
                        <img src={`https://localhost:7103/api/Images/${badge.image}`} alt="Badge Image" width="50" height="50" />
                      </td>
                      <td>{badge.registerDate}</td>
                      <td>
                        <a href={`/UpdateBadges/${badge.badgeId}`} className="btn btn-sm btn-warning">
                          Editar
                        </a>
                        <button onClick={() => handleDelete(badge.badgeId)} className="btn btn-sm btn-danger ms-3">
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
        <Modal.Body>¿Estás seguro de que quieres eliminar esta insignia?</Modal.Body>
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

export default Badges;
