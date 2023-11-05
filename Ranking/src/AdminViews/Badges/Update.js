import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import info3 from '../../images/info_3.png';

function UpdateBadge() {
  const { id } = useParams();
  const [badgeName, setBadgeName] = useState('');
  const [image, setImage] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7103/api/Badges/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBadgeName(data.badgeName);
        setImage(data.image);
      })
      .catch((error) => console.error('Error fetching badge data: ', error));
  }, [id]);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Badge';
  };

  // Función para registrar una auditoría de actualización
  const createAuditLog = async (originalData, updatedData) => {
    const badgeAuditData = {
      badgeId: id,
      oldBadgeName: originalData.badgeName,
      actualBadgeName: updatedData.badgeName,
      oldImage: originalData.image,
      actualImage: updatedData.image,
      action: 'Update',
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    try {
      const response = await fetch('https://localhost:7103/api/BadgeAudits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(badgeAuditData),
      });

      if (!response.ok) {
        console.error('Error al agregar BadgeAudit');
      }
    } catch (error) {
      console.error('Error al registrar la auditoría: ', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtén los datos actuales de la insignia antes de la actualización
    const responseBeforeUpdate = await fetch(`https://localhost:7103/api/Badges/${id}`);
    const dataBeforeUpdate = await responseBeforeUpdate.json();

    const updatedBadge = {
      badgeId: id,
      badgeName: badgeName,
      image: image,
    };

    const response = await fetch(`https://localhost:7103/api/Badges/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBadge),
    });

    if (response.ok) {
      // Obtén los datos actualizados de la insignia después de la actualización
      const responseAfterUpdate = await fetch(`https://localhost:7103/api/Badges/${id}`);
      const dataAfterUpdate = await responseAfterUpdate.json();

      // Registra una auditoría de actualización
      createAuditLog(dataBeforeUpdate, dataAfterUpdate);

      handleShowInfoModal();
    } else {
      console.error('Error al actualizar la insignia:', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Actualizar Insignia</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="badgeName">Nombre de la insignia:</label>
              <input required
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
                type="file"
                accept="image/*"
                className="form-control"
                id="image"
                onChange={(event) => {
                  if (event.target.files.length > 0) {
                    setImage(event.target.files[0].name);
                  } else {
                    setImage('');
                  }
                }}
              /><br/>

              {image && (
                <div>
                  <img src={`https://localhost:7103/api/Images/${image}`} alt="Selected Image" width="250" height="250" />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Insignia</button>
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
          Insignia actualizada con éxito.
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

export default UpdateBadge;
