import React, { useState, useEffect } from 'react';
import '../../Styles/tables.css';

function Careers() {
  const [careers, setCareers] = useState([]);
  const [departments, setDepartments] = useState({});

  useEffect(() => {
    fetch('https://localhost:7103/api/Careers')
      .then((response) => response.json())
      .then((data) => setCareers(data))
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
  }, []);

  const handleDelete = (careerId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta carrera?");
    if (confirmDelete) {
      fetch(`https://localhost:7103/api/Careers/${careerId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setCareers((prevCareers) =>
              prevCareers.filter((career) => career.careerId !== careerId)
            );
          } else {
            console.error('Error al eliminar la carrera: ', response.statusText);
          }
        })
        .catch((error) => console.error('Error al eliminar la carrera: ', error));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Carreras</h2>
            <h4>Lista de carreras</h4>
            <a href='/CreateCareers' className="btn btn-success mb-3 btnAdd">Añadir Carrera</a>
            <table className="table table-responsive">
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
                      <button
                        onClick={() => handleDelete(career.careerId)}
                        className="btn btn-sm btn-danger"
                      >
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
    </div>
  );
}

export default Careers;
