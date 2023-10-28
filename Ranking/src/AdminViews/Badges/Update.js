import React, { useState, useEffect } from 'react';
import '../../Styles/App.css';

function UpdateBadge({ match }) {
  const { id } = match.params;
  const [badgeName, setBadgeName] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    // Realiza una solicitud GET para obtener los detalles de la insignia por su ID
    fetch(`https://localhost:7103/api/Badges/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBadgeName(data.badgeName);
        setImage(data.image);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crea un objeto con los datos actualizados
    const updatedBadge = {
      badgeId: id,
      badgeName: badgeName,
      image: image,
    };

    // Realiza una solicitud PUT para actualizar la insignia
    fetch(`https://localhost:7103/api/Badges/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBadge),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Insignia actualizada:', data);
        window.alert('Insignia actualizada con éxito');
        // Redirigir a la lista de insignias u otra página
        window.location.href = '/Badges';
      })
      .catch((error) => {
        console.error('Error al actualizar la insignia: ', error);
        window.alert('Error al actualizar la insignia');
      });
  };

  return (
    <div className="container">
      <h2 className="font-weight-bold">Actualizar Insignia</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="badgeName">Nombre de la Insignia:</label>
          <input
            type="text"
            className="form-control"
            id="badgeName"
            value={badgeName}
            onChange={(e) => setBadgeName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">Actualizar Insignia</button>
      </form>
    </div>
  );
}

export default UpdateBadge;
