import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';

function Create() {
  const [badgeName, setBadgeName] = useState('');
  const [image, setImage] = useState(null);

  const handleBadgeNameChange = (event) => {
    setBadgeName(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('badgeName', badgeName);
    formData.append('image', image);

    try {
      const response = await fetch('https://localhost:7103/api/Badges', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        window.alert('Insignia creada con éxito');
        window.location.href = '/Badge';
      } else {
        const errorText = await response.text();
        console.error('Error al crear la insignia: ', errorText);
      }
    } catch (error) {
      console.error('Error al crear la insignia: ', error);
    }
  };

  return (
    <div className="App bg-green">
      <h2 className="mx-3 p-3">Crear Insignia</h2>
      <div className="App-header d-block">
        <div className="row mx-5 p-5">
          <form className="col-md-5 mx-5" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="badgeName">Nombre de la Insignia:</label>
              <input
                required
                type="text"
                className="form-control"
                id="badgeName"
                value={badgeName}
                onChange={handleBadgeNameChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Imagen:</label>
              <input
                required
                type="file"
                className="form-control"
                id="image"
                onChange={handleImageChange}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">
              Crear Insignia
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
