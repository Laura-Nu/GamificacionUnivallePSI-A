import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/tables.css';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departmentIdToDelete, setDepartmentIdToDelete] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false); // Nuevo estado

  useEffect(() => {
    fetch('https://localhost:7103/api/Departments')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((unity) => {
          const formattedDate = new Date(unity.registerDate).toLocaleDateString('en-GB');
          return { ...unity, registerDate: formattedDate };
        });

        // Filtra solo los registros con status igual a 1
        const filteredData = formattedData.filter((department) => department.status === 1);

        const sortedData = filteredData.sort((a, b) => a.departmentName.localeCompare(b.departmentName));
        setDepartments(sortedData);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [statusChanged]); // Carga la lista nuevamente cuando statusChanged cambia

  useEffect(() => {
    fetch('https://localhost:7103/api/Faculties')
      .then((response) => response.json())
      .then((data) => {
        const facultyMap = {};
        data.forEach((faculty) => {
          facultyMap[faculty.facultyId] = faculty.facultyName;
        });
        setFaculties(facultyMap);
      })
      .catch((error) => console.error('Error fetching faculties: ', error));
  }, []);

  const handleDelete = (departmentId) => {
    setDepartmentIdToDelete(departmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (departmentIdToDelete) {
      const departmentToUpdate = departments.find((department) => department.departmentId === departmentIdToDelete);

      if (!departmentToUpdate) {
        console.error('No se encontró el departamento a eliminar.');
        return;
      }

      const updatedData = {
        departmentId: departmentIdToDelete,
        departmentName: departmentToUpdate.departmentName,
        facultyId: departmentToUpdate.facultyId,
        status: 0, // Cambia el estado a 0 para la eliminación lógica
      };

      fetch(`https://localhost:7103/api/Departments/${departmentIdToDelete}`, {
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
            console.error('Error al cambiar el estado del departamento: ', response.statusText);
          }
        })
        .then(() => {
          // Crear un objeto de auditoría para la eliminación lógica
          const departmentAuditData = {
            departmentId: departmentIdToDelete,
            oldDepartmentName: departmentToUpdate.departmentName,
            actualDepartmentName: departmentToUpdate.departmentName,
            oldFacultyId: departmentToUpdate.facultyId,
            actualFacultyId: departmentToUpdate.facultyId,
            action: 'Delete',
            userID: JSON.parse(sessionStorage.userData).userId,
          };

          // Envía los datos de auditoría a un endpoint de API para su registro
          return fetch('https://localhost:7103/api/DepartmentAudits', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(departmentAuditData),
          });
        })
        .then((auditResponse) => {
          if (auditResponse.ok) {
            setStatusChanged(!statusChanged); // Cambia el estado para recargar la lista nuevamente
          } else {
            console.error('Error al agregar DepartmentAudit');
          }
        })
        .catch((error) => {
          console.error('Error al cambiar el estado del departamento: ', error);
        });
    }
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Departamentos</h2><br/>
            <a href='/CreateDepartments' className="btn btn-success mb-3 btnAdd">Añadir Departamento</a>
            <table className="table table-responsive text-center mx-5">
              <thead>
                <tr>
                  <th>Nombre del Departamento</th>
                  <th>Facultad</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department) => (
                  <tr key={department.departmentId}>
                    <td>{department.departmentName}</td>
                    <td>{faculties[department.facultyId]}</td>
                    <td>{department.registerDate}</td>
                    <td>
                      <a href={`/UpdateDepartments/${department.departmentId}`} className="btn btn-sm btn-warning">Editar</a>
                      <button onClick={() => handleDelete(department.departmentId)} className="btn btn-sm btn-danger ms-3">
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
        <Modal.Body>¿Estás seguro de que quieres eliminar este departamento?</Modal.Body>
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

export default Departments;
