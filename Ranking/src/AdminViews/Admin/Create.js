import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [academicUnityId, setAcademicUnityId] = useState('');
  const [careerId, setCareerId] = useState('');
  const [user, setUser] = useState('');
  const [expireDateAdmin, setExpireDateAdmin] = useState(); // Valor por defecto para la fecha
  const [academicUnitOptions, setAcademicUnitOptions] = useState([]);
  const [careerOptions, setCareerOptions] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

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

  const handleDateChange = (date) => {
    setExpireDateAdmin(date);
  };

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Admins';
  };
  
  const handleBlur = () => {
    generateUser();
  };

  const generateUser = () => {
    if (firstName && lastName) {
      let emailPrefix = `${firstName.charAt(0)}${lastName}`;
      if (secondLastName) {
        emailPrefix += secondLastName.charAt(0);
      }
      const user = emailPrefix.toLowerCase();
      setUser(user);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const academicUnity = academicUnitOptions.find((unit) => unit.academicUnityName === academicUnityId);
    const career = careerOptions.find((c) => c.careerName === careerId);

    if (!academicUnity || !career) {
      console.error('Unidad académica o carrera no encontrada');
      return;
    }

    const newAdmin = {
      firstName: firstName,
      lastName: lastName,
      secondLastName: secondLastName,
      academicUnityId: academicUnity.academicUnityId,
      careerId: career.careerId,
      email: user + '@univalle.edu',
      status: 1,
      role: 'Admin',
      username: user,
      password: user,
      expireDateAdmin: expireDateAdmin,
    };
    console.log(newAdmin);
    const response = await fetch('https://localhost:7103/api/User/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAdmin),
    });

    if (response.ok) {
      handleShowInfoModal();
    } else {
      console.error('Error al agregar el administrador', await response.text());
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
      <h2 className='p-2 text-center font-weight-bold'>Añadir Administradores</h2>
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
                aria-label="Selecciona una Unidad Académica"
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
              <label htmlFor="expireDateAdmin">Fecha:</label>
              <DatePicker
                selected={expireDateAdmin}
                dateFormat="dd/MM/yyyy"
                onChange={handleDateChange}
                className="form-control border-success border-3 rounded-4"
              />
            </div>
            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Administrador</button>
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
          Administrador creado con éxito.
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
