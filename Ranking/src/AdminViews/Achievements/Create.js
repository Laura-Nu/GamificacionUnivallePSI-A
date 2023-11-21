import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import info3 from '../../images/info_3.png';

function CreateArchievement() {
  const [archievement, setArchievement] = useState({
    sanctionName: '',
    description: '',
    punctuation: '',
    type:'Achievement',
  });
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Achievements';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('https://localhost:7103/api/Sanctions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(archievement),
    });

    if (response.ok) {
      const newArchievement = await response.json(); // Obtén el logro creada con su ID asignado
      createAuditLog(newArchievement);

      handleShowInfoModal();
    } else {
      console.error('Error al crear el logro', await response.text());
    }
  };

  const createAuditLog = (newArchievement) => {
    const archievementAuditData = {
      sanctionId: newArchievement.sanctionId, // ID de la nueva sanción
      oldSanctionName: '',
      actualSanctionName: newArchievement.sanctionName,
      oldDescription: '',
      actualDescription: newArchievement.description,
      oldPunctuation: 0,
      actualPunctuation: newArchievement.punctuation,
      action: 'Create', // Acción de auditoría para la creación
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    fetch('https://localhost:7103/api/SanctionAudits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(archievementAuditData),
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
    setArchievement({
      ...archievement,
      [name]: value,
    });
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Añadir Logro</h2>
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
                value={archievement.sanctionName}
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
                value={archievement.description}
                onChange={handleChange}
                className="form-control border-success border-3 rounded-4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="punctuation">Puntos a añadir:</label>
              <input
                required
                type="number"
                id="punctuation"
                name="punctuation"
                value={archievement.punctuation}
                onChange={handleChange}
                className="form-control border-success border-3 rounded-4"
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Logro</button>
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
          Logro creado con éxito.
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

export default CreateArchievement;
