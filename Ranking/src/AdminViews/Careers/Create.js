import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Create() {
  const [careerName, setCareerName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7103/api/Departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching departments: ', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newCareer = {
      careerName: careerName,
      departmentId: parseInt(departmentId)
    };

    const response = await fetch('https://localhost:7103/api/Careers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCareer),
    });

    if (response.ok) {
      window.alert('Carrera agregada con éxito');
      window.location.href = '/Careers';
    } else {
      console.error('Error al agregar la carrera:', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Añadir Carreras</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="careerName">Nombre de la carrera:</label>
              <input
                required
                type="text"
                className="form-control"
                id="careerName"
                value={careerName}
                onChange={(e) => setCareerName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="departmentId">Departamento:</label>
              <select
                required
                className="form-control"
                id="departmentId"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option value="">Selecciona un departamento</option>
                {departments.map((department) => (
                  <option key={department.departmentId} value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Carrera</button>
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
