import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/tables.css';

function Careers() {
  const [careers, setCareers] = useState([]);
  const [departments, setDepartments] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [careerIdToDelete, setCareerIdToDelete] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false); // Nuevo estado

  useEffect(() => {
    fetch('https://localhost:7103/api/Careers')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((unity) => {
          const formattedDate = new Date(unity.registerDate).toLocaleDateString('en-GB');
          return { ...unity, registerDate: formattedDate };
        });

        // Filtra solo los registros con status igual a 1
        const filteredData = formattedData.filter((career) => career.status === 1);

        const sortedData = filteredData.sort((a, b) => a.careerName.localeCompare(b.careerName));
        setCareers(sortedData);
      })
      .catch((error) => console.error('Error fetching data: ', error));

    fetch('https://localhost:7103/api/Departments')
      .then((response) => response.json())
      .then((data) => {
        const departmentMap = {};
        data.forEach((department) => {
          departmentMap[department.departmentId] = department.departmentName;
        });
        setDepartments(departmentMap);
      })
      .catch((error) => console.error('Error fetching departments: ', error));
  }, [statusChanged]); // Carga la lista nuevamente cuando statusChanged cambia

  const handleDelete = (careerId) => {
    setCareerIdToDelete(careerId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (careerIdToDelete) {
      const careerToUpdate = careers.find((career) => career.careerId === careerIdToDelete);

      if (!careerToUpdate) {
        console.error('No se encontró la carrera a eliminar.');
        return;
      }

      const updatedData = {
        careerId: careerIdToDelete,
        careerName: careerToUpdate.careerName,
        departmentId: careerToUpdate.departmentId,
        status: 0, // Cambia el estado a 0 para la eliminación lógica
      };

      fetch(`https://localhost:7103/api/Careers/${careerIdToDelete}`, {
        method: 'PUT', // Cambia el método a PUT para la eliminación lógica
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.ok) {
            setStatusChanged(!statusChanged); // Cambia el estado para recargar la lista
          } else {
            console.error('Error al cambiar el estado de la carrera: ', response.statusText);
          }
        })
        .then(() => {
          // Crear un objeto de auditoría para la eliminación lógica
          const careerAuditData = {
            careerId: careerIdToDelete,
            oldCareerName: careerToUpdate.careerName,
            actualCareerName: careerToUpdate.careerName,
            oldDepartmentId: careerToUpdate.departmentId,
            actualDepartmentId: careerToUpdate.departmentId,
            action: 'Delete',
            userID: JSON.parse(sessionStorage.userData).userId,
          };

          // Envía los datos de auditoría a un endpoint de API para su registro
          return fetch('https://localhost:7103/api/CareerAudits', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(careerAuditData),
          });
        })
        .then((auditResponse) => {
          if (auditResponse.ok) {
            setStatusChanged(!statusChanged); // Cambia el estado para recargar la lista nuevamente
          } else {
            console.error('Error al agregar CareerAudit');
          }
        })
        .catch((error) => {
          console.error('Error al cambiar el estado de la carrera: ', error);
        });
    }
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Carreras</h2><br/>
            <a href='/CreateCareers' className="btn btn-success mb-3 btnAdd">Añadir Carrera</a>
            <table className="table table-responsive text-center mx-5">
              <thead>
                <tr>
                  <th>Nombre de la Carrera</th>
                  <th>Departamento</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((career) => (
                  <tr key={career.careerId}>
                    <td>{career.careerName}</td>
                    <td>{departments[career.departmentId]}</td>
                    <td>{career.registerDate}</td>
                    <td>
                      <a href={`/UpdateCareers/${career.careerId}`} className="btn btn-sm btn-warning">Editar</a>
                      <button onClick={() => handleDelete(career.careerId)} className="btn btn-sm btn-danger ms-3">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres eliminar esta carrera?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Careers;
