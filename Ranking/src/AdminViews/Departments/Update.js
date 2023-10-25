import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/tables.css';

function Update() {
  const { id } = useParams();
  const [departmentName, setDepartmentName] = useState(''); // Estado para el nombre del departamento
  const [facultyId, setFacultyId] = useState(''); // Estado para el ID de la facultad

  const [faculties, setFaculties] = useState({});

  useEffect(() => {
    // Realiza una solicitud GET para obtener los detalles del departamento por su ID
    fetch(`https://localhost:7103/api/Departments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Establece los datos en los estados locales
        setDepartmentName(data.departmentName);
        setFacultyId(data.facultyId);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]); // Ejecuta esta carga inicial cuando cambia el ID en la URL

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener la lista de facultades y sus IDs
    fetch('https://localhost:7103/api/Faculties')
      .then((response) => response.json())
      .then((data) => {
        const facultyMap = {};
        data.forEach((faculty) => {
          facultyMap[faculty.facultyId] = faculty.facultyName;
        });
        setFaculties(facultyMap);
      })
      .catch((error) => console.error('Error fetching faculties: ', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crea un objeto con los datos a actualizar
    const updatedData = {
      departmentId: id,
      departmentName: departmentName,
      facultyId: facultyId,
      // Agrega otros campos aquí si es necesario
    };

    // Realiza una solicitud PUT para actualizar el departamento
    const response = await fetch(`https://localhost:7103/api/Departments/${updatedData.departmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      window.alert('Departamento actualizado con éxito');
      window.location.href = '/Departments'; // Redirige a la página de departamentos
    } else {
      console.error('Error al actualizar el departamento');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Actualizar Departamento</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="departmentName">Nombre del Departamento:</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="departmentName"
                  value={departmentName} // Muestra el nombre actual
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
                  {Object.keys(faculties).map((facultyId) => (
                    <option key={facultyId} value={facultyId}>
                      {faculties[facultyId]}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Departamento</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
