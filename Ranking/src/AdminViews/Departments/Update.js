import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';

function Update() {
  const { id } = useParams();
  const [departmentName, setDepartmentName] = useState('');
  const [facultyId, setFacultyId] = useState('');

  const [faculties, setFaculties] = useState({});

  useEffect(() => {
    fetch(`https://localhost:7103/api/Departments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDepartmentName(data.departmentName);
        setFacultyId(data.facultyId);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]);

  useEffect(() => {
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

    const updatedData = {
      departmentId: id,
      departmentName: departmentName,
      facultyId: facultyId,
    };

    const response = await fetch(`https://localhost:7103/api/Departments/${updatedData.departmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      window.alert('Departamento actualizado con éxito');
      window.location.href = '/Departments';
    } else {
      console.error('Error al actualizar el departamento');
    }
  };

  return (
    <div className="App bg-green">
      <h2 className="font-weight-bold text-center">Actualizar Departamento</h2>
      <div className="App-header">
        <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="departmentName">Nombre del Departamento:</label>
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
    </div>
  );
}

export default Update;
