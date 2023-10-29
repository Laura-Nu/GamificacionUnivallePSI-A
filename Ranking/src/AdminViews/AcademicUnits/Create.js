<<<<<<< HEAD:ranking_estv1.0/src/AdminViews/AcademicUnits/Create.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import info3 from '../../images/info_3.png';

function Create() {
  return (
    <div className="App bg-green">
      <h2>Añadir Unidades Académicas</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5'>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="name" name="name" />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Unidad Académica</button>
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
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Create() {
  const [academicUnityName, setAcademicUnityName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newAcademicUnity = {
      academicUnityName: academicUnityName,
    };

    const response = await fetch('https://localhost:7103/api/AcademicUnities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAcademicUnity),
    });

    if (response.ok) {
      window.alert('Unidad académica agregada con éxito');
      window.location.href = '/Academic';
    } else {
      console.error('Error al agregar la unidad académica');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Añadir Unidades Académicas</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="academicUnityName">Nombre de la unidad académica:</label>
          <input required
            type="text"
            className="form-control"
            id="academicUnityName"
            value={academicUnityName}
            onChange={(e) => setAcademicUnityName(e.target.value)}
          />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Unidad Académica</button>
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

>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b:Ranking/src/AdminViews/AcademicUnits/Create.js
