import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateBadge() {
  const { id } = useParams();
  const [badgeName, setBadgeName] = useState('');
  const [image, setImage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file.name);
    }
  };

  useEffect(() => {
    fetch(`https://localhost:7103/api/Badges/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBadgeName(data.badgeName);
        setImage(data.image);
      })
      .catch((error) => console.error('Error fetching badge data: ', error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedBadge = {
      badgeId: id,
      badgeName: badgeName,
      image: image,
    };

    const response = await fetch(`https://localhost:7103/api/Badges/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBadge),
    });
    console.log(JSON.stringify(updatedBadge));

    if (response.ok) {
      window.alert('Insignia actualizada con éxito');
      window.location.href = '/Badge';
    } else {
      console.error('Error al actualizar la insignia:', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Actualizar Insignia</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="badgeName">Nombre de la insignia:</label>
              <input
                required
                type="text"
                className="form-control"
                id="badgeName"
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Selecciona una imagen:</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="image"
                onChange={handleImageUpload}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Insignia</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBadge;
