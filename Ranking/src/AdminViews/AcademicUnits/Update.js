<<<<<<< HEAD:ranking_estv1.0/src/AdminViews/AcademicUnits/Update.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import info3 from '../../images/info_3.png';

function Update() {
  return (
    <div className="App bg-green">
      <h2>Actualizar Unidades Académicas</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5'>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="name" name="name" />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Unidad Académica</button>
          </form>

          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Update;

=======
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Update() {
  const { id } = useParams();
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`https://localhost:7103/api/AcademicUnities/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.academicUnityName);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      academicUnityId: id,
      academicUnityName: name,
    };

    const response = await fetch(`https://localhost:7103/api/AcademicUnities/${updatedData.academicUnityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      window.alert('Unidad académica actualizada con éxito');
      window.location.href = '/academic';
    } else {
      console.error('Error al actualizar la unidad académica');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Actualizar Unidades Académicas</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Unidad Académica</button>
          </form>

          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b:Ranking/src/AdminViews/AcademicUnits/Update.js
