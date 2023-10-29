import React, { useState, useEffect } from 'react';
import '../../Styles/tables.css';

function Academic() {
  const [academicUnities, setAcademicUnities] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7103/api/AcademicUnities')
      .then((response) => response.json())
      .then((data) => setAcademicUnities(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const handleDelete = (academicUnityId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta unidad académica?");
    if (confirmDelete) {
      fetch(`https://localhost:7103/api/AcademicUnities/${academicUnityId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setAcademicUnities((prevAcademicUnities) =>
              prevAcademicUnities.filter((unity) => unity.academicUnityId !== academicUnityId)
            );
          } else {
            console.error('Error al eliminar la unidad académica: ', response.statusText);
          }
        })
        .catch((error) => console.error('Error al eliminar la unidad académica: ', error));
    }
  };
  

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Unidades Académicas</h2>
            <h4>Lista de Unidades académicas</h4>
            <a href='/CreateAcademicUnits' className="btn btn-success mb-3 btnAdd">Añadir Unidad Académica</a>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha de Registro</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {academicUnities.map((academicUnity) => (
                  <tr key={academicUnity.academicUnityId}>
                    <td>{academicUnity.academicUnityName}</td>
                    <td>{academicUnity.registerDate}</td>
                    <td>
                      <a href={`/UpdateAcademicUnits/${academicUnity.academicUnityId}`} className="btn btn-sm btn-warning">Editar</a>
                      <button
                        onClick={() => handleDelete(academicUnity.academicUnityId)}
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

export default Academic;
