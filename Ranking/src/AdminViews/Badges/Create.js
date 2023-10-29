<<<<<<< HEAD:ranking_estv1.0/src/AdminViews/Badges/Create.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import info3 from '../../images/info_3.png';

function Create() {
  return (
    <div className="App bg-green">
      <h2>Añadir Badges</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5'>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="name" name="name" />
            </div>

            <div className="form-group">
              <label htmlFor="levels">Cantidad de Niveles:</label>
              <input className="form-control border-success border-3 rounded-4" type="number" id="levels" name="levels" />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Badge</button>
          </form>

          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Create;

=======
import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateBadge() {
  const [badgeName, setBadgeName] = useState('');
  const [image, setImage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file.name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBadge = {
      badgeName: badgeName,
      image: image,
    };

    const response = await fetch('https://localhost:7103/api/Badges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBadge),
    });

    if (response.ok) {
      window.alert('Insignia agregada con éxito');
      window.location.href = '/Badge';
    } else {
      console.error('Error al agregar la insignia:', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Añadir Insignia</h2>
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

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Insignia</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBadge;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b:Ranking/src/AdminViews/Badges/Create.js
