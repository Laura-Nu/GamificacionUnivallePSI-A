import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';
import Rank from '../../Controllers/Rank';

function UpdateStudent() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    academicUnityId: '',
    careerId: '',
    email: '',
    student: {
      rank: '',
      score: 0, // Inicializado en 0
    },
  });
  const [academicUnitOptions, setAcademicUnitOptions] = useState([]);
  const [careerOptions, setCareerOptions] = useState([]);
  const [fullRank, setFullRank] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    // Obtén los datos del estudiante antes de la actualización
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

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Students';
  };

  const createAuditLog = (dataBeforeUpdate) => {
    // Crear un objeto de auditoría para la actualización
    const auditData = {
      personId: id, // ID del estudiante
      oldScore: dataBeforeUpdate.student.score, // Puntaje anterior
      actualScore: studentData.student.score, // Puntaje actualizado
      oldRank: dataBeforeUpdate.student.rank, // Rango anterior
      actualRank: studentData.student.rank, // Rango actualizado
      action: 'Update', // Acción de auditoría para la actualización
      userID: JSON.parse(sessionStorage.userData).userId,
    };

    // Envía los datos de auditoría a un endpoint de API para su registro
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
    const rankInstance = new Rank({ score: studentData.student.score });
    const { fullRank } = rankInstance.GetRank();
    setFullRank(fullRank);

    var updatedStudent = { ...studentData };
    updatedStudent.student.rank = fullRank;

    try {
      // Obtén los datos del estudiante antes de la actualización
      const responseBeforeUpdate = await fetch(`https://localhost:7103/api/People/${id}`);
      const dataBeforeUpdate = await responseBeforeUpdate.json();

      // Realiza la actualización de los datos del estudiante
      const response = await fetch(`https://localhost:7103/api/People/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudent),
      });

      if (response.ok) {
        createAuditLog(dataBeforeUpdate); // Llama a la función para crear la auditoría
        handleShowInfoModal();
      } else {
        console.error('Error al actualizar el estudiante', await response.text());
      }
    } catch (error) {
      console.error('Error al obtener los datos antes de la actualización', error);
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
      <h2 className='p-2 text-center font-weight-bold'>Actualizar Estudiante</h2>
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
              <label htmlFor="academicUnityId">Sede</label>
              <select
                className="form-select border-success border-3 rounded-4"
                id="academicUnityId"
                name="academicUnityId"
                value={studentData.academicUnityId}
                onChange={(e) => setStudentData({ ...studentData, academicUnityId: e.target.value })}
              >
                <option value="" disabled>Selecciona una opción</option>
                {filteredAcademicUnitOptions.map((option) => (
                  <option key={option.academicUnityId} value={option.academicUnityId}>
                    {option.academicUnityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="careerId">Carrera</label>
              <select required
                className="form-select border-success border-3 rounded-4"
                id="careerId"
                name="careerId"
                value={studentData.careerId}
                onChange={(e) => setStudentData({ ...studentData, careerId: e.target.value })}
              >
                <option value="" disabled>Selecciona una opción</option>
                {filteredCareerOptions.map((option) => (
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
              <label htmlFor="score">Puntaje:</label>
              <input required
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

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Estudiante actualizado con éxito.
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

export default UpdateStudent;
