import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import info3 from '../../images/info_3.png';

function CreateBadge() {
  const [badgeName, setBadgeName] = useState('');
  const [image, setImage] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [badgeId, setBadgeId] = useState(null); // Inicialízalo con null

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file.name);
    }
  };

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Badge';
  };

  // Función para crear la auditoría de creación de insignia
  const createAuditLog = (badgeName, badgeId, badgeImage) => {
    const badgeAuditData = {
      badgeId: badgeId, // ID de la insignia
      oldBadgeName: '',
      actualBadgeName: badgeName,
      oldImage: '',
      actualImage: badgeImage, // Ruta o nombre de la imagen de la insignia
      action: 'Create', // Acción de auditoría para la creación
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    fetch('https://localhost:7103/api/BadgeAudits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(badgeAuditData),
    })
      .then((auditResponse) => {
        if (!auditResponse.ok) {
          console.error('Error al agregar BadgeAudit');
        }
      })
      .catch((error) => {
        console.error('Error al registrar la auditoría: ', error);
      });
  };

  useEffect(() => {
    // Si badgeId se actualizó y no es null, entonces crea la auditoría
    if (badgeId !== null) {
      createAuditLog(badgeName, badgeId, image);
    }
  }, [badgeId, badgeName, image]); // Ejecuta esto cuando badgeId, badgeName o image cambien

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBadge = {
      badgeName: badgeName,
      image: image,
      status: 1, // Definir el estado de la nueva insignia como activa (1)
    };

    const response = await fetch('https://localhost:7103/api/Badges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBadge),
    });

    if (response.ok) {
      // Obtener el ID de la insignia desde la respuesta
      const newBadgeData = await response.json();
      setBadgeId(newBadgeData.badgeId); // Actualiza badgeId con el ID real

      handleShowInfoModal();
    } else {
      console.error('Error al agregar la insignia:', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className="p-2 text-center font-weight-bold">Añadir Insignia</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="badgeName">Nombre de la insignia:</label>
              <input
                required
                type="text"
                className="form-control"
                id="badgeName"
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Selecciona una imagen:</label>
              <input
                required
                type="file"
                accept="image/*"
                className="form-control"
                id="image"
                onChange={handleImageUpload}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Insignia</button>
          </form>

          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>
        </div>
      </div>

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Insignia creada con éxito.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseInfoModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default CreateBadge;
