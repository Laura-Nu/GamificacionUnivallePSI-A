import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Create() {
  const [facultyName, setFacultyName] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Faculties';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crear una nueva Faculty
    const newFaculty = {
      facultyName: facultyName,
    };

    const facultyResponse = await fetch('https://localhost:7103/api/Faculties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFaculty),
    });

    // Comprobar si la creación de la Faculty fue exitosa
    if (!facultyResponse.ok) {
      console.error('Error al agregar la facultad');
      return;
    }

    // Obtener la Faculty recién creada
    const facultyData = await facultyResponse.json();

    // Crear un nuevo FacultyAudit relacionado con la Faculty creada
    const newFacultyAudit = {
      facultyId: facultyData.facultyId, // Usamos el ID de la Faculty recién creada
      oldFacultyName: '',
      actualFacultyName: facultyData.facultyName,
      action: 'Create',
      userID: JSON.parse(sessionStorage.userData).userId,
    };
    
    const facultyAuditResponse = await fetch('https://localhost:7103/api/FacultyAudits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFacultyAudit),
    });

    // Comprobar si la creación de FacultyAudit fue exitosa
    if (facultyAuditResponse.ok) {
      handleShowInfoModal();
    } else {
      console.error('Error al agregar FacultyAudit');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Añadir Facultad</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="facultyName">Nombre de la facultad:</label>
              <input required
                type="text"
                className="form-control"
                id="facultyName"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Facultad</button>
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
          Facultad creada con éxito.
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
