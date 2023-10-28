import React, { useState, useEffect } from 'react';
import '../../Styles/tables.css';

function Badges() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7103/api/Badges')
      .then((response) => response.json())
      .then((data) => setBadges(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const handleDelete = (badgeId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta insignia?");
    if (confirmDelete) {
      fetch(`https://localhost:7103/api/Badges/${badgeId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setBadges((prevBadges) =>
              prevBadges.filter((badge) => badge.badgeId !== badgeId)
            );
          } else {
            console.error('Error al eliminar la insignia: ', response.statusText);
          }
        })
        .catch((error) => console.error('Error al eliminar la insignia: ', error));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Insignias</h2>
            <h4>Lista de Insignias</h4>
            <a href='/CreateBadges' className="btn btn-success mb-3 btnAdd">Añadir Insignia</a>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>ID de Insignia</th>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Estado</th>
                  <th>Fecha de Registro</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {badges.map((badge) => (
                  <tr key={badge.badgeId}>
                    <td>{badge.badgeId}</td>
                    <td>{badge.badgeName}</td>
                    <td>
                      <img src={badge.image} alt="Badge Image" width="50" height="50" />
                    </td>
                    <td>{badge.status}</td>
                    <td>{badge.registerDate}</td>
                    <td>
                      <a href={`/UpdateBadges/${badge.badgeId}`} className="btn btn-sm btn-warning">Editar</a>
                      <button
                        onClick={() => handleDelete(badge.badgeId)}
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

export default Badges;
