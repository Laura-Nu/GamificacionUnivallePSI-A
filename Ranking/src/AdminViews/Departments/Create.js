import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function CreateDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [faculties, setFaculties] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetch('https://localhost:7103/api/Faculties')
      .then((response) => response.json())
      .then((data) => {
        // Filtrar facultades con status igual a 1
        const filteredFaculties = data.filter((faculty) => faculty.status === 1);
        setFaculties(filteredFaculties);
      })
      .catch((error) => console.error('Error fetching faculties: ', error));
  }, []);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Departments';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDepartment = {
      departmentName: departmentName,
      facultyId: facultyId,
      status: 1, // Definir el estado del nuevo departamento como activo (1)
    };

    const response = await fetch('https://localhost:7103/api/Departments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDepartment),
    });

    if (response.ok) {
      // Auditoría de creación de departamento
      const newDepartmentData = await response.json(); // Obtén el departamento creado con su ID asignado
      createAuditLog(newDepartmentData);

      handleShowInfoModal();
    } else {
      console.error('Error al agregar el departamento', await response.text());
    }
  };

  const createAuditLog = (newDepartmentData) => {
    const departmentAuditData = {
      departmentId: newDepartmentData.departmentId, // ID del nuevo departamento
      oldDepartmentName: '',
      actualDepartmentName: newDepartmentData.departmentName,
      oldFacultyId: 0,
      actualFacultyId: newDepartmentData.facultyId,
      action: 'Create', // Acción de auditoría para la creación
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    fetch('https://localhost:7103/api/DepartmentAudits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(departmentAuditData),
    })
      .then((auditResponse) => {
        if (!auditResponse.ok) {
          console.error('Error al agregar DepartmentAudit');
        }
      })
      .catch((error) => {
        console.error('Error al registrar la auditoría: ', error);
      });
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Añadir Departamento</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="departmentName">Nombre del departamento:</label>
              <input
                required
                type="text"
                className="form-control"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="facultyId">Facultad:</label>
              <select
                required
                className="form-control"
                id="facultyId"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
              >
                <option value="">Selecciona una facultad</option>
                {faculties.map((faculty) => (
                  <option key={faculty.facultyId} value={faculty.facultyId}>
                    {faculty.facultyName}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Departamento</button>
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
          Departamento creado con éxito.
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

export default CreateDepartment;
