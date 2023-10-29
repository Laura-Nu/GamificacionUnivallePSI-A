<<<<<<< HEAD:ranking_estv1.0/src/AdminViews/Careers/Update.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import info3 from '../../images/info_3.png';

function Update() {
  return (
    <div className="App bg-green">
      <h2>Actualizar Carreras</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5'>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="name" name="name" />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Carrera</button>
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
  const [careerName, setCareerName] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7103/api/Careers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCareerName(data.careerName);
        setDepartmentId(data.departmentId);
      })
      .catch((error) => console.error('Error fetching data: ', error));

    fetch('https://localhost:7103/api/Departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching departments: ', error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      careerId: id,
      careerName: careerName,
      departmentId: departmentId,
    };

    const response = await fetch(`https://localhost:7103/api/Careers/${updatedData.careerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      window.alert('Carrera actualizada con éxito');
      window.location.href = '/Careers';
    } else {
      console.error('Error al actualizar la carrera');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Actualizar Carreras</h2>
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

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Carrera</button>
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
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b:Ranking/src/AdminViews/Careers/Update.js
