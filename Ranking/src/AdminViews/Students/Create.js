<<<<<<< HEAD:ranking_estv1.0/src/AdminViews/Students/Create.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import info3 from '../../images/info_3.png';

function Create() {
  return (
    <div className="App bg-green">
      <h2>Añadir Estudiantes</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5'>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="name" name="name" />
            </div>
            <div>
              <label htmlFor="lastname" className="form-label">Apellido Paterno:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="lastname" name="lastname" />
            </div>
            <div>
              <label htmlFor="lastname2">Apellido Materno:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="lastname2" name="lastname2" />
            </div>
            <div>
              <label htmlFor="academicUnit">Unidad Académica</label>
              <select className="form-select border-success border-3 rounded-4" aria-label="Selecciona una Unidad Académica" id="academicUnit" name="academicUnit"
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="Tiquipaya">Tiquipaya</option>
                <option value="América">América</option>
                <option value="Trinidad">Trinidad</option>
              </select>
            </div>

            <div>
              <label htmlFor="career">Carrera</label>
              <select className="form-select border-success border-3 rounded-4" aria-label="Selecciona una Carrera" id="career" name="career" >
                <option value="" disabled>Selecciona una opción</option>
                <option value="Carrera1">Carrera 1</option>
                <option value="Carrera2">Carrera 2</option>
                <option value="Carrera3">Carrera 3</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" className="form-control border-success border-3 rounded-4" />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Estudiante</button>
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
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [academicUnityId, setAcademicUnityId] = useState('');
  const [careerId, setCareerId] = useState('');
  const [email, setEmail] = useState('');
  const [academicUnitOptions, setAcademicUnitOptions] = useState([]);
  const [careerOptions, setCareerOptions] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7103/api/AcademicUnities')
      .then((response) => response.json())
      .then((data) => setAcademicUnitOptions(data))
      .catch((error) => console.error('Error fetching academic unities: ', error));

    fetch('https://localhost:7103/api/Careers')
      .then((response) => response.json())
      .then((data) => setCareerOptions(data))
      .catch((error) => console.error('Error fetching careers: ', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const academicUnity = academicUnitOptions.find((unit) => unit.academicUnityName === academicUnityId);
    const career = careerOptions.find((c) => c.careerName === careerId);

    if (!academicUnity || !career) {
      console.error('Unidad académica o carrera no encontrada');
      return;
    }

    const newStudent = {
      firstName: firstName,
      lastName: lastName,
      secondLastName: secondLastName,
      academicUnityId: academicUnity.academicUnityId,
      careerId: career.careerId,
      email: email,
      status: 1,
      role: 'Student',
      username: firstName,
      password: 'pass',

    };

    const response = await fetch('https://localhost:7103/api/User/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });

    if (response.ok) {
      window.alert('Estudiante agregado con éxito');
      window.location.href = '/Students';
    } else {
      console.error('Error al agregar el estudiante', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Añadir Estudiantes</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Nombre:</label>
              <input
                required
                type="text"
                className="form-control border-success border-3 rounded-4"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="form-label">Primer Apellido:</label>
              <input
                required
                type="text"
                className="form-control border-success border-3 rounded-4"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="secondLastName">Segundo Apellido:</label>
              <input
                type="text"
                className="form-control border-success border-3 rounded-4"
                id="secondLastName"
                value={secondLastName}
                onChange={(e) => setSecondLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="academicUnityId">Unidad Académica</label>
              <select
                required
                className="form-select border-success border-3 rounded-4"
                aria-label="Selecciona una Unidad Académica"
                id="academicUnityId"
                value={academicUnityId}
                onChange={(e) => setAcademicUnityId(e.target.value)}
              >
                <option value="" disabled>Selecciona una opción</option>
                {academicUnitOptions.map((option) => (
                  <option key={option.academicUnityId} value={option.academicUnityName}>
                    {option.academicUnityName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="careerId">Carrera</label>
              <select
                required
                className="form-select border-success border-3 rounded-4"
                aria-label="Selecciona una Carrera"
                id="careerId"
                value={careerId}
                onChange={(e) => setCareerId(e.target.value)}
              >
                <option value="" disabled>Selecciona una opción</option>
                {careerOptions.map((option) => (
                  <option key={option.careerId} value={option.careerName}>
                    {option.careerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                className="form-control border-success border-3 rounded-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Estudiante</button>
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
>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b:Ranking/src/AdminViews/Students/Create.js
