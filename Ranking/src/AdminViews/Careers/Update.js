import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Update() {
  const { id } = useParams();
  const [careerName, setCareerName] = useState(''); // Estado para el nombre de la carrera
  const [departmentId, setDepartmentId] = useState(''); // Estado para el ID del departamento

  const [departments, setDepartments] = useState([]); // Estado para almacenar la lista de departamentos

  useEffect(() => {
    // Realiza una solicitud GET para obtener los detalles de la carrera por su ID
    fetch(`https://localhost:7103/api/Careers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Establece los datos en los estados locales
        setCareerName(data.careerName);
        setDepartmentId(data.departmentId);
      })
      .catch((error) => console.error('Error fetching data: ', error));

    // Realizar una solicitud GET a la API para obtener la lista de departamentos
    fetch('https://localhost:7103/api/Departments')
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error('Error fetching departments: ', error));
  }, [id]); // Ejecuta esta carga inicial cuando cambia el ID en la URL

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crea un objeto con los datos a actualizar
    const updatedData = {
      careerId: id,
      careerName: careerName,
      departmentId: departmentId,
      // Agrega otros campos aquí si es necesario
    };

    // Realiza una solicitud PUT para actualizar la carrera
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
      <h2 className='mx-3 p-3'>Actualizar Carreras</h2>
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
                value={careerName} // Muestra el nombre actual
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
