import React, { useState, useEffect } from 'react';
import '../../Styles/tables.css';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState({});

  useEffect(() => {
    fetch('https://localhost:7103/api/Departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

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
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este departamento?");
    if (confirmDelete) {
      fetch(`https://localhost:7103/api/Departments/${departmentId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setDepartments((prevDepartments) =>
              prevDepartments.filter((department) => department.departmentId !== departmentId)
            );
          } else {
            console.error('Error al eliminar el departamento: ', response.statusText);
          }
        })
        .catch((error) => console.error('Error al eliminar el departamento: ', error));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Departamentos</h2>
            <h4>Lista de departamentos</h4>
            <a href='/CreateDepartments' className="btn btn-success mb-3 btnAdd">Añadir Departamento</a>
            <table className="table table-responsive">
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
                      <button
                        onClick={() => handleDelete(department.departmentId)}
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

export default Departments;
