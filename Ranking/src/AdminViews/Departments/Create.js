import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function CreateDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const [facultyId, setFacultyId] = useState(''); // Estado para el ID de la facultad
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener la lista de facultades
    fetch('https://localhost:7103/api/Faculties')
      .then((response) => response.json())
      .then((data) => setFaculties(data))
      .catch((error) => console.error('Error fetching faculties: ', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDepartment = {
      departmentName: departmentName,
      facultyId: facultyId, // Agrega el facultyId seleccionado
    };

    const response = await fetch('https://localhost:7103/api/Departments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDepartment),
    });

    if (response.ok) {
      window.alert('Departamento agregado con éxito');
      window.location.href = '/Departments';
    } else {
      console.error('Error al agregar el departamento');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Añadir Departamento</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="departmentName">Nombre del departamento:</label>
              <input
                required
                type="text"
                className="form-control"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="facultyId">Facultad:</label>
              <select
                required
                className="form-control"
                id="facultyId"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
              >
                <option value="">Selecciona una facultad</option>
                {faculties.map((faculty) => (
                  <option key={faculty.facultyId} value={faculty.facultyId}>
                    {faculty.facultyName}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Departamento</button>
          </form>

          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDepartment;
