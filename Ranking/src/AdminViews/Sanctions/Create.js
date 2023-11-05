import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateSanction() {
  const [sanction, setSanction] = useState({
    sanctionName: '',
    description: '',
    punctuation: '',
  });
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Sanction';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('https://localhost:7103/api/Sanctions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanction),
    });

    if (response.ok) {
      // Auditoría de creación de sanción
      const newSanction = await response.json(); // Obtén la sanción creada con su ID asignado
      createAuditLog(newSanction);

      handleShowInfoModal();
    } else {
      console.error('Error al crear la sanción', await response.text());
    }
  };

  const createAuditLog = (newSanction) => {
    const sanctionAuditData = {
      sanctionId: newSanction.sanctionId, // ID de la nueva sanción
      oldSanctionName: '',
      actualSanctionName: newSanction.sanctionName,
      oldDescription: '',
      actualDescription: newSanction.description,
      oldPunctuation: 0,
      actualPunctuation: newSanction.punctuation,
      action: 'Create', // Acción de auditoría para la creación
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    fetch('https://localhost:7103/api/SanctionAudits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanctionAuditData),
    })
      .then((auditResponse) => {
        if (!auditResponse.ok) {
          console.error('Error al agregar SanctionAudit');
        }
      })
      .catch((error) => {
        console.error('Error al registrar la auditoría: ', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSanction({
      ...sanction,
      [name]: value,
    });
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Añadir Sanción</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="sanctionName">Nombre:</label>
              <input
                required
                type="text"
                id="sanctionName"
                name="sanctionName"
                value={sanction.sanctionName}
                onChange={handleChange}
                className="form-control border-success border-3 rounded-4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <input
                required
                type="text"
                id="description"
                name="description"
                value={sanction.description}
                onChange={handleChange}
                className="form-control border-success border-3 rounded-4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="punctuation">Puntuación:</label>
              <input
                required
                type="number"
                id="punctuation"
                name="punctuation"
                value={sanction.punctuation}
                onChange={handleChange}
                className="form-control border-success border-3 rounded-4"
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Sanción</button>
          </form>
        </div>
      </div>

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sanción creada con éxito.
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

export default CreateSanction;
