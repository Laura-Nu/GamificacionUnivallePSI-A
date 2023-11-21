import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Update() {
  const { id } = useParams();
  const [careerName, setCareerName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7103/api/Careers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCareerName(data.careerName);
        setDepartmentId(data.departmentId);
      })
      .catch((error) => console.error('Error fetching data: ', error));

    fetch('https://localhost:7103/api/Departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data.filter(department => department.status === 1)))
      .catch((error) => console.error('Error fetching departments: ', error));
  }, [id]);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Careers';
  };

  // Función para registrar una auditoría de actualización
  const createAuditLog = async (originalData, updatedData) => {
    const careerAuditData = {
      careerId: id,
      oldCareerName: originalData.careerName,
      actualCareerName: updatedData.careerName,
      oldDepartmentId: originalData.departmentId,
      actualDepartmentId: updatedData.departmentId,
      action: 'Update',
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    try {
      const response = await fetch('https://localhost:7103/api/CareerAudits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(careerAuditData),
      });

      if (!response.ok) {
        console.error('Error al agregar CareerAudit');
      }
    } catch (error) {
      console.error('Error al registrar la auditoría: ', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtén los datos actuales de la carrera antes de la actualización
    const responseBeforeUpdate = await fetch(`https://localhost:7103/api/Careers/${id}`);
    const dataBeforeUpdate = await responseBeforeUpdate.json();

    const updatedData = {
      careerId: id,
      careerName: careerName,
      departmentId: departmentId,
    };

    const response = await fetch(`https://localhost:7103/api/Careers/${updatedData.careerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      // Obtén los datos actualizados de la carrera después de la actualización
      const responseAfterUpdate = await fetch(`https://localhost:7103/api/Careers/${id}`);
      const dataAfterUpdate = await responseAfterUpdate.json();

      // Registra una auditoría de actualización
      createAuditLog(dataBeforeUpdate, dataAfterUpdate);

      handleShowInfoModal();
    } else {
      console.error('Error al actualizar la carrera');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Actualizar Carreras</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="careerName">Nombre de la carrera:</label>
              <input required
                type="text"
                className="form-control"
                id="careerName"
                value={careerName}
                onChange={(e) => setCareerName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="departmentId">Departamento:</label>
              <select required
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

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Carrera</button>
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
          Carrera actualizada con éxito.
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
