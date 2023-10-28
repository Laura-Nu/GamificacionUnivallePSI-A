import React, { useState, useEffect } from 'react';
import '../../Styles/tables.css';

function Admin() {
  const [admins, setAdmins] = useState([]);
  const [careers, setCareers] = useState({});
  const [academicUnities, setAcademicUnities] = useState({});

  useEffect(() => {
    fetch('https://localhost:7103/api/People')
      .then((response) => response.json())
      .then((data) => setAdmins(data))
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
  }, []);

  const handleDelete = (personId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este administrador?");
    if (confirmDelete) {
      fetch(`https://localhost:7103/api/People/${personId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setAdmins((prevAdmins) =>
              prevAdmins.filter((admin) => admin.personId !== personId)
            );
          } else {
            console.error('Error al eliminar el administrador: ', response.statusText);
          }
        })
        .catch((error) => console.error('Error al eliminar el administrador: ', error));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Administradores</h2>
            <h4>Lista de administradores</h4>
            <a href='/CreateAdmin' className="btn btn-success mb-3 btnAdd">Añadir Administrador</a>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Primer Apellido</th>
                  <th>Segundo Apellido</th>
                  <th>Carrera</th>
                  <th>Unidad Académica</th>
                  <th>Expiración de sesión</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => {
                  if (admin.role === "Admin") {
                    return (
                      <tr key={admin.personId}>
                        <td>{admin.firstName}</td>
                        <td>{admin.lastName}</td>
                        <td>{admin.secondLastName}</td>
                        <td>{careers[admin.careerId]}</td>
                        <td>{academicUnities[admin.academicUnityId]}</td>
                        <td>{admin.expireDateAdmin}</td>
                        <td>
                          <a href={`/UpdateAdmin/${admin.personId}`} className="btn btn-sm btn-warning">Editar</a>
                          <button
                            onClick={() => handleDelete(admin.personId)}
                            className="btn btn-sm btn-danger"
                          >
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
    </div>
  );
}

export default Admin;
