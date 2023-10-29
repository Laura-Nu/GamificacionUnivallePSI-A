import React, { useState, useEffect } from 'react';
import '../../Styles/tables.css';

function Sanctions() {
  const [sanctions, setSanctions] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7103/api/Sanctions')
      .then((response) => response.json())
      .then((data) => setSanctions(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const handleDelete = (sanctionId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta sanción?");
    if (confirmDelete) {
      fetch(`https://localhost:7103/api/Sanctions/${sanctionId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setSanctions((prevSanctions) =>
              prevSanctions.filter((sanction) => sanction.sanctionId !== sanctionId)
            );
          } else {
            console.error('Error al eliminar la sanción: ', response.statusText);
          }
        })
        .catch((error) => console.error('Error al eliminar la sanción: ', error));
    }
  };
  

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Sanciones</h2>
            <h4>Lista de Sanciones</h4>
            <a href='/CreateSanction' className="btn btn-success mb-3 btnAdd">Añadir Sanción</a>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Puntuación</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sanctions.map((sanction) => (
                  <tr key={sanction.sanctionId}>
                    <td>{sanction.sanctionName}</td>
                    <td>{sanction.description}</td>
                    <td>{sanction.punctuation}</td>
                    <td>{sanction.registerDate}</td>
                    <td>
                      <a href={`/UpdateSanction/${sanction.sanctionId}`} className="btn btn-sm btn-warning">Editar</a>
                      <button
                        onClick={() => handleDelete(sanction.sanctionId)}
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

export default Sanctions;
