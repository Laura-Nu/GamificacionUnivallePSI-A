import React, { useState, useEffect } from 'react';
import '../../Styles/tables.css';

function Facultys() {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7103/api/Faculties')
      .then((response) => response.json())
      .then((data) => setFaculties(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const handleDelete = (facultyId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta facultad?");
    if (confirmDelete) {
      fetch(`https://localhost:7103/api/Faculties/${facultyId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setFaculties((prevFaculties) =>
              prevFaculties.filter((faculty) => faculty.facultyId !== facultyId)
            );
          } else {
            console.error('Error al eliminar la facultad: ', response.statusText);
          }
        })
        .catch((error) => console.error('Error al eliminar la facultad: ', error));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Facultades</h2>
            <h4>Lista de facultades</h4>
            <a href='/CreateFaculties' className="btn btn-success mb-3 btnAdd">Añadir Facultad</a>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Nombre de la Facultad</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((faculty) => (
                  <tr key={faculty.facultyId}>
                    <td>{faculty.facultyName}</td>
                    <td>{faculty.registerDate}</td>
                    <td>
                      <a href={`/UpdateFaculties/${faculty.facultyId}`} className="btn btn-sm btn-warning">Editar</a>
                      <button
                        onClick={() => handleDelete(faculty.facultyId)}
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

export default Facultys;
