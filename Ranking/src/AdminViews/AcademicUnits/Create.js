import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Create() {
  const [academicUnityName, setAcademicUnityName] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [academicUnityId, setAcademicUnityId] = useState(null); // Inicialízalo con null

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Academic';
  };

  // Función para crear la auditoría de creación de unidad académica
  const createAuditLog = (academicUnityName, academicUnityId) => {
    const academicUnityAuditData = {
      academicUnityId: academicUnityId, // ID de la unidad académica
      oldAcademicUnityName: '',
      actualAcademicUnityName: academicUnityName,
      action: 'Create', // Acción de auditoría para la creación
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    fetch('https://localhost:7103/api/AcademicUnityAudits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(academicUnityAuditData),
    })
      .then((auditResponse) => {
        if (!auditResponse.ok) {
          console.error('Error al agregar AcademicUnityAudit');
        }
      })
      .catch((error) => {
        console.error('Error al registrar la auditoría: ', error);
      });
  };

  useEffect(() => {
    // Si academicUnityId se actualizó y no es null, entonces crea la auditoría
    if (academicUnityId !== null) {
      createAuditLog(academicUnityName, academicUnityId);
    }
  }, [academicUnityId, academicUnityName]); // Ejecuta esto cuando academicUnityId o academicUnityName cambien

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newAcademicUnity = {
      academicUnityName: academicUnityName,
      status: 1, // Definir el estado de la nueva unidad académica como activa (1)
    };

    const response = await fetch('https://localhost:7103/api/AcademicUnities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAcademicUnity),
    });

    if (response.ok) {
      // Obtener el ID de la unidad académica desde la respuesta
      const newAcademicUnityData = await response.json();
      setAcademicUnityId(newAcademicUnityData.academicUnityId); // Actualiza academicUnityId con el ID real

      handleShowInfoModal();
    } else {
      console.error('Error al agregar la unidad académica');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Añadir Sede</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="academicUnityName">Nombre:</label>
              <input required
                type="text"
                className="form-control"
                id="academicUnityName"
                value={academicUnityName}
                onChange={(e) => setAcademicUnityName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Sede</button>
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
          Sede creada con éxito.
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

export default Create;
