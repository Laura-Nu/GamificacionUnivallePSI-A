import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function UpdateFaculty() {
  const { id } = useParams();
  const [facultyName, setFacultyName] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7103/api/Faculties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFacultyName(data.facultyName);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Faculties';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtén los datos actuales de la facultad antes de la actualización
    const responseBeforeUpdate = await fetch(`https://localhost:7103/api/Faculties/${id}`);
    const dataBeforeUpdate = await responseBeforeUpdate.json();

    const updatedData = {
      facultyId: id,
      facultyName: facultyName,
    };

    // Realiza la actualización de la facultad
    const response = await fetch(`https://localhost:7103/api/Faculties/${updatedData.facultyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      // Obtén los datos actualizados de la facultad después de la actualización
      const responseAfterUpdate = await fetch(`https://localhost:7103/api/Faculties/${id}`);
      const dataAfterUpdate = await responseAfterUpdate.json();

      // Crea un objeto de auditoría para la actualización
      const facultyAuditData = {
        facultyId: id,
        oldFacultyName: dataBeforeUpdate.facultyName,
        actualFacultyName: dataAfterUpdate.facultyName,
        action: 'Update',
        userID: JSON.parse(sessionStorage.userData).userId,
      };

      // Envía los datos de auditoría a un endpoint de API para su registro
      const facultyAuditResponse = await fetch('https://localhost:7103/api/FacultyAudits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facultyAuditData),
      });

      if (facultyAuditResponse.ok) {
        handleShowInfoModal();
      } else {
        console.error('Error al agregar FacultyAudit');
      }
    } else {
      console.error('Error al actualizar la facultad');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Actualizar Facultad</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="facultyName">Nombre:</label>
              <input required
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="facultyName"
                name="facultyName"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Facultad</button>
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
          Facultad actualizada con éxito.
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

export default UpdateFaculty;
