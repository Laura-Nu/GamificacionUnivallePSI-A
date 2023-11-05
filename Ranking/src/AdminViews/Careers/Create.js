import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Create() {
  const [careerName, setCareerName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetch('https://localhost:7103/api/Departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data.filter((department) => department.status === 1)))
      .catch((error) => console.error('Error fetching departments: ', error));
  }, []);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Careers';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCareer = {
      careerName: careerName,
      departmentId: parseInt(departmentId),
      status: 1, // Definir el estado de la nueva carrera como activa (1)
    };

    const response = await fetch('https://localhost:7103/api/Careers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCareer),
    });

    if (response.ok) {
      // Auditoría de creación de carrera
      const newCareerData = await response.json(); // Obtén la carrera creada con su ID asignado
      createAuditLog(newCareerData);

      handleShowInfoModal();
    } else {
      console.error('Error al agregar la carrera:', await response.text());
    }
  };

  const createAuditLog = (newCareerData) => {
    const careerAuditData = {
      careerId: newCareerData.careerId, // ID de la nueva carrera
      oldCareerName: '',
      actualCareerName: newCareerData.careerName,
      oldDepartmentId: 0,
      actualDepartmentId: newCareerData.departmentId,
      action: 'Create', // Acción de auditoría para la creación
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    fetch('https://localhost:7103/api/CareerAudits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(careerAuditData),
    })
      .then((auditResponse) => {
        if (!auditResponse.ok) {
          console.error('Error al agregar CareerAudit');
        }
      })
      .catch((error) => {
        console.error('Error al registrar la auditoría: ', error);
      });
  };

  return (
    <div className="App bg-green">
      <h2 className="p-2 text-center font-weight-bold">Añadir Carreras</h2>
      <div className="App-header d-block">
        <div className="row mx-5 p-5">
          <form className="col-md-5 mx-5" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="careerName">Nombre de la carrera:</label>
              <input
                required
                type="text"
                className="form-control"
                id="careerName"
                value={careerName}
                onChange={(e) => setCareerName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="departmentId">Departamento:</label>
              <select
                required
                className="form-control"
                id="departmentId"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option value="">Selecciona un departamento</option>
                {departments.map((department) => (
                  <option key={department.departmentId} value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">
              Añadir Carrera
            </button>
          </form>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>
        </div>
      </div>

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>Carrera creada con éxito.</Modal.Body>
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
