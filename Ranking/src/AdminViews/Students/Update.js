import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function UpdateStudent() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    academicUnityId: '',
    careerId: '',
    email: '',
    student:{
      rank: '',
      score: '',
    }
  });
  const [academicUnitOptions, setAcademicUnitOptions] = useState([]);
  const [careerOptions, setCareerOptions] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:7103/api/People/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudentData(data);
      })
      .catch((error) => console.error('Error fetching student data: ', error));

    fetch('https://localhost:7103/api/AcademicUnities')
      .then((response) => response.json())
      .then((data) => setAcademicUnitOptions(data))
      .catch((error) => console.error('Error fetching academic unities: ', error));

    fetch('https://localhost:7103/api/Careers')
      .then((response) => response.json())
      .then((data) => setCareerOptions(data))
      .catch((error) => console.error('Error fetching careers: ', error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedStudent = { ...studentData };

    const response = await fetch(`https://localhost:7103/api/People/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    });

    if (response.ok) {
      window.alert('Estudiante actualizado con éxito');
      window.location.href = '/Students';
    } else {
      console.error('Error al actualizar el estudiante', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Actualizar Estudiante</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Nombre:</label>
              <input
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="firstName"
                name="firstName"
                value={studentData.firstName}
                onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Primer Apellido:</label>
              <input
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="lastName"
                name="lastName"
                value={studentData.lastName}
                onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="secondLastName">Segundo Apellido:</label>
              <input
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="secondLastName"
                name="secondLastName"
                value={studentData.secondLastName}
                onChange={(e) => setStudentData({ ...studentData, secondLastName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="academicUnityId">Unidad Académica</label>
              <select
                className="form-select border-success border-3 rounded-4"
                id="academicUnityId"
                name="academicUnityId"
                value={studentData.academicUnityId}
                onChange={(e) => setStudentData({ ...studentData, academicUnityId: e.target.value })}
              >
                <option value="" disabled>Selecciona una opción</option>
                {academicUnitOptions.map((option) => (
                  <option key={option.academicUnityId} value={option.academicUnityId}>
                    {option.academicUnityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="careerId">Carrera</label>
              <select
                className="form-select border-success border-3 rounded-4"
                id="careerId"
                name="careerId"
                value={studentData.careerId}
                onChange={(e) => setStudentData({ ...studentData, careerId: e.target.value })}
              >
                <option value="" disabled>Selecciona una opción</option>
                {careerOptions.map((option) => (
                  <option key={option.careerId} value={option.careerId}>
                    {option.careerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                className="form-control border-success border-3 rounded-4"
                type="email"
                id="email"
                name="email"
                value={studentData.email}
                onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rank">Rango:</label>
              <input
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="rank"
                name="rank"
                value={studentData.student.rank}
                onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, rank: e.target.value } })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="score">Puntaje:</label>
              <input
                className="form-control border-success border-3 rounded-4"
                type="number"
                id="score"
                name="score"
                value={studentData.student.score}
                onChange={(e) => setStudentData({ ...studentData, student: { ...studentData.student, score: e.target.value } })}
              />
            </div>
            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Estudiante</button>
          </form>
          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateStudent;
