import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';

function Update() {
  const { id } = useParams();
  const [departmentName, setDepartmentName] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [faculties, setFaculties] = useState({});
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7103/api/Departments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDepartmentName(data.departmentName);
        setFacultyId(data.facultyId);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]);

  useEffect(() => {
    fetch('https://localhost:7103/api/Faculties')
      .then((response) => response.json())
      .then((data) => {
        const facultyMap = {};
        data.filter((faculty) => faculty.status === 1)
        .forEach((faculty) => {
          facultyMap[faculty.facultyId] = faculty.facultyName;
        });
        setFaculties(facultyMap);
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

  // Función para registrar una auditoría de actualización
  const createAuditLog = async (originalData, updatedData) => {
    const departmentAuditData = {
      departmentId: id,
      oldDepartmentName: originalData.departmentName,
      actualDepartmentName: updatedData.departmentName,
      oldFacultyId: originalData.facultyId,
      actualFacultyId: updatedData.facultyId,
      action: 'Update',
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    try {
      const response = await fetch('https://localhost:7103/api/DepartmentAudits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departmentAuditData),
      });

      if (!response.ok) {
        console.error('Error al agregar DepartmentAudit');
      }
    } catch (error) {
      console.error('Error al registrar la auditoría: ', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtén los datos actuales del departamento antes de la actualización
    const responseBeforeUpdate = await fetch(`https://localhost:7103/api/Departments/${id}`);
    const dataBeforeUpdate = await responseBeforeUpdate.json();

    const updatedData = {
      departmentId: id,
      departmentName: departmentName,
      facultyId: facultyId,
    };

    const response = await fetch(`https://localhost:7103/api/Departments/${updatedData.departmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      // Obtén los datos actualizados del departamento después de la actualización
      const responseAfterUpdate = await fetch(`https://localhost:7103/api/Departments/${id}`);
      const dataAfterUpdate = await responseAfterUpdate.json();

      // Registra una auditoría de actualización
      createAuditLog(dataBeforeUpdate, dataAfterUpdate);

      handleShowInfoModal();
    } else {
      console.error('Error al actualizar el departamento');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Actualizar Departamento</h2>
      <div className="App-header">
        <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="departmentName">Nombre del Departamento:</label>
                <input required
                  type="text"
                  className="form-control"
                  id="departmentName"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="facultyId">Facultad:</label>
                <select required
                  className="form-control"
                  id="facultyId"
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                >
                  <option value="">Selecciona una facultad</option>
                  {Object.keys(faculties).map((facultyId) => (
                    <option key={facultyId} value={facultyId}>
                      {faculties[facultyId]}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Departamento</button>
            </form>
          </div>
          </div>
        </div>
      </div>

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Departamento actualizado con éxito.
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
