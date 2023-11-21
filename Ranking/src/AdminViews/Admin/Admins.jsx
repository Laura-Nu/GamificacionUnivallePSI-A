import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/tables.css';

function Admin() {
  const [admins, setAdmins] = useState([]);
  const [careers, setCareers] = useState({});
  const [academicUnities, setAcademicUnities] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [personIdToDelete, setPersonIdToDelete] = useState(null);
  const [modalClosed, setModalClosed] = useState(false);

  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    }
    return null;
  };

  useEffect(() => {
    fetch('https://localhost:7103/api/People')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((admin) => {
          const formattedExpireDate = formatDate(admin.expireDateAdmin);
          return { ...admin, expireDateAdmin: formattedExpireDate };
        });

        // Filtrar solo los registros con status 1
        const filteredData = formattedData.filter((admin) => admin.status === 1);

        const sortedData = filteredData.sort((a, b) => a.lastName.localeCompare(b.lastName));
        setAdmins(sortedData);
      })
      .catch((error) => console.error('Error fetching administrators: ', error));

    fetch('https://localhost:7103/api/Careers')
      .then((response) => response.json())
      .then((data) => {
        const careerMap = {};
        data.forEach((career) => {
          careerMap[career.careerId] = career.careerName;
        });
        setCareers(careerMap);
      })
      .catch((error) => console.error('Error fetching careers: ', error));

    fetch('https://localhost:7103/api/AcademicUnities')
      .then((response) => response.json())
      .then((data) => {
        const academicUnityMap = {};
        data.forEach((academicUnity) => {
          academicUnityMap[academicUnity.academicUnityId] = academicUnity.academicUnityName;
        });
        setAcademicUnities(academicUnityMap);
      })
      .catch((error) => console.error('Error fetching academic unities: ', error));
  }, [modalClosed]);

  const handleDelete = (personId) => {
    setShowDeleteModal(true);
    setPersonIdToDelete(personId);
  };

  const confirmDelete = () => {
    if (personIdToDelete) {
      const adminToUpdate = admins.find((admin) => admin.personId === personIdToDelete);

      if (!adminToUpdate) {
        console.error('No se encontró el administrador a eliminar.');
        return;
      }

      const updatedData = {
        personId: personIdToDelete,
        firstName: adminToUpdate.firstName,
        lastName: adminToUpdate.lastName,
        secondLastName: adminToUpdate.secondLastName,
        academicUnityId: adminToUpdate.academicUnityId,
        careerId: adminToUpdate.careerId,
        email: adminToUpdate.email,
        role: "Admin",
        status: 0,
      };

      fetch(`https://localhost:7103/api/People/${personIdToDelete}`, {
        method: 'PUT', // Cambia el método a PUT para la eliminación lógica
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (response.ok) {
            setAdmins((prevAdmins) =>
              prevAdmins.map((admin) =>
                admin.personId === personIdToDelete ? { ...admin, status: 0 } : admin
              )
            );
          } else {
            console.error('Error al cambiar el estado del administrador: ', response.statusText);
          }
          setModalClosed(true);
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error('Error al cambiar el estado del administrador: ', error);
          setModalClosed(true);
          setShowDeleteModal(false);
        });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Administradores</h2><br />
            <a href='/CreateAdmin' className="btn btn-success mb-3 btnAdd">
              Añadir Administrador
            </a>
            <table className="table table-responsive mx-5">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Carrera</th>
                  <th>Sede</th>
                  <th>Rol</th>
                  <th>Expiración de sesión</th>
                  <th className='text-center'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => {
                  if (admin.role === 'Admin' || admin.role === 'Master') {
                    return (
                      <tr key={admin.personId}>
                        <td>
                          {admin.lastName} {admin.secondLastName}, {admin.firstName}
                        </td>
                        <td>{careers[admin.careerId]}</td>
                        <td>{academicUnities[admin.academicUnityId]}</td>
                        <td>{admin.role}</td>
                        <td>{admin.expireDateAdmin}</td>
                        <td>
                          <a href={`/UpdateAdmin/${admin.personId}`} className="btn btn-sm btn-warning">
                            Editar
                          </a>
                          <button onClick={() => handleDelete(admin.personId)} className="btn btn-sm btn-danger ms-3">
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres eliminar este administrador?</Modal.Body>
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

export default Admin;
