import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';
import { Button, Modal } from 'react-bootstrap';

function Update() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7103/api/AcademicUnities/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.academicUnityName);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/academic';
  };

  // Función para registrar una auditoría de actualización
  const createAuditLog = async (originalData, updatedData) => {
    const academicUnityAuditData = {
      academicUnityId: id,
      oldAcademicUnityName: originalData.academicUnityName,
      actualAcademicUnityName: updatedData.academicUnityName,
      action: 'Update',
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    try {
      const response = await fetch('https://localhost:7103/api/AcademicUnityAudits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(academicUnityAuditData),
      });

      if (!response.ok) {
        console.error('Error al agregar AcademicUnityAudit');
      }
    } catch (error) {
      console.error('Error al registrar la auditoría: ', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtén los datos actuales de la unidad académica antes de la actualización
    const responseBeforeUpdate = await fetch(`https://localhost:7103/api/AcademicUnities/${id}`);
    const dataBeforeUpdate = await responseBeforeUpdate.json();

    const updatedData = {
      academicUnityId: id,
      academicUnityName: name,
    };

    const response = await fetch(`https://localhost:7103/api/AcademicUnities/${updatedData.academicUnityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      // Obtén los datos actualizados de la unidad académica después de la actualización
      const responseAfterUpdate = await fetch(`https://localhost:7103/api/AcademicUnities/${id}`);
      const dataAfterUpdate = await responseAfterUpdate.json();

      // Registra una auditoría de actualización
      createAuditLog(dataBeforeUpdate, dataAfterUpdate);

      handleShowInfoModal();
    } else {
      console.error('Error al actualizar la unidad académica');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Actualizar Sedes</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input required
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Sede</button>
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
          Sede actualizada con éxito.
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

export default Update;
