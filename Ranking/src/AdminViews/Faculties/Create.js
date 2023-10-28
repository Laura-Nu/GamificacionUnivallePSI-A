import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Create() {
  const [facultyName, setFacultyName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newFaculty = {
      facultyName: facultyName,
    };

    const response = await fetch('https://localhost:7103/api/Faculties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFaculty),
    });

    if (response.ok) {
      window.alert('Facultad agregada con éxito');
      window.location.href = '/Faculties';
    } else {
      console.error('Error al agregar la facultad');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Añadir Facultad</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="facultyName">Nombre de la facultad:</label>
              <input
                required
                type="text"
                className="form-control"
                id="facultyName"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Facultad</button>
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
