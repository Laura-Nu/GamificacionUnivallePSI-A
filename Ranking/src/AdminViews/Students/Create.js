import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';
import Rank from '../../Controllers/Rank';

function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [academicUnityId, setAcademicUnityId] = useState('');
  const [careerId, setCareerId] = useState('');
  const [ci, setCi] = useState('');
  const [user, setUser] = useState('');
  const [academicUnitOptions, setAcademicUnitOptions] = useState([]);
  const [careerOptions, setCareerOptions] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [score, setScore] = useState(0);
  const [fullRank, setFullRank] = useState('');

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

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Students';
  };

  const handleBlur = () => {
    generateUser();
  };

  const generateUser = () => {
    if (firstName && lastName && ci) {
      const paddedCi = ci.padStart(7, '0');
      let emailPrefix = `${lastName.charAt(0)}${secondLastName.charAt(0)}`;
    
    if (secondLastName) {
      emailPrefix += firstName.charAt(0);
    }
      const user = `${emailPrefix.toLowerCase()}${paddedCi}`;
      setUser(user);
    }
  };
  
  const createAuditLog = (studentData) => {
    const data = JSON.parse(studentData.user);
    console.log(data);
    const auditData = {
      personId: data.PersonId, // ID del estudiante
      oldScore: 0,
      actualScore: data.Student.Score,
      oldRank: '',
      actualRank: data.Student.Rank,
      action: 'Create', // Acción de auditoría para la creación
      userID: JSON.parse(sessionStorage.userData).userId,
    };
    fetch('https://localhost:7103/api/StudentAudits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auditData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Registro de auditoría creado con éxito');
        } else {
          console.error('Error al crear el registro de auditoría', response);
        }
      })
      .catch((error) => {
        console.error('Error al crear el registro de auditoría', error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rankInstance = new Rank({ score: score });
    const { fullRank } = rankInstance.GetRank();
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
      email: user + '@est.univalle.edu',
      status: 1,
      role: 'Student',
      username: user,
      password: user,
      student:{rank: fullRank,
        score: score}
    };

    const response = await fetch('https://localhost:7103/api/User/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });

    if (response.ok) {
      const studentData = await response.json(); // Obtén los datos del estudiante, incluido personId
      console.log(studentData);
      createAuditLog(studentData);
      handleShowInfoModal();
    } else {
      console.error('Error al agregar el estudiante', await response.text());
    }
  };

  // Filtra las opciones de Academic Units y Careers
  const filteredAcademicUnitOptions = academicUnitOptions.filter(
    (option) => option.status === 1
  );
  const filteredCareerOptions = careerOptions.filter(
    (option) => option.status === 1
  );

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Añadir Estudiantes</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Nombre:</label>
              <input required
                type="text"
                className="form-control border-success border-3 rounded-4"
                id="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Primer Apellido:</label>
              <input required
                type="text"
                className="form-control border-success border-3 rounded-4"
                id="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label htmlFor="secondLastName">Segundo Apellido:</label>
              <input
                type="text"
                className="form-control border-success border-3 rounded-4"
                id="secondLastName"
                value={secondLastName}
                onChange={(e) => {
                  setSecondLastName(e.target.value);
                }}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label htmlFor="academicUnityId">Sede</label>
              <select required
                className="form-select border-success border-3 rounded-4"
                aria-label="Selecciona una Sede"
                id="academicUnityId"
                value={academicUnityId}
                onChange={(e) => setAcademicUnityId(e.target.value)}
              >
                <option value="" disabled>Selecciona una opción</option>
                {filteredAcademicUnitOptions.map((option) => (
                  <option key={option.academicUnityId} value={option.academicUnityName}>
                    {option.academicUnityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="careerId">Carrera</label>
              <select required
                className="form-select border-success border-3 rounded-4"
                aria-label="Selecciona una Carrera"
                id="careerId"
                value={careerId}
                onChange={(e) => setCareerId(e.target.value)}
              >
                <option value="" disabled>Selecciona una opción</option>
                {filteredCareerOptions.map((option) => (
                  <option key={option.careerId} value={option.careerName}>
                    {option.careerName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="score">Puntaje:</label>
              <input required
                className="form-control border-success border-3 rounded-4"
                type="number"
                id="score"
                name="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ci">Numero de Estudiante:</label>
              <input required
                type="number"
                id="ci"
                name="ci"
                className="form-control border-success border-3 rounded-4"
                value={ci}
                onChange={(e) => {
                  setCi(e.target.value);
                }}
                onBlur={handleBlur}
              />
            </div>
            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Estudiante</button>
          </form>
          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>
        </div>
      </div>

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Estudiante creado con éxito.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseInfoModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Create;
