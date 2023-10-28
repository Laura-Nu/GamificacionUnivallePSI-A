import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function UpdateFaculty() {
  const { id } = useParams();
  const [facultyName, setFacultyName] = useState('');

  useEffect(() => {
    fetch(`https://localhost:7103/api/Faculties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFacultyName(data.facultyName);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      facultyId: id,
      facultyName: facultyName,
    };

    const response = await fetch(`https://localhost:7103/api/Faculties/${updatedData.facultyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      window.alert('Facultad actualizada con éxito');
      window.location.href = '/Faculties';
    } else {
      console.error('Error al actualizar la facultad');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Actualizar Facultad</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="facultyName">Nombre:</label>
              <input
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="facultyName"
                name="facultyName"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Facultad</button>
          </form>

          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateFaculty;
