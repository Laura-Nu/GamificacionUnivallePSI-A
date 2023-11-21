import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';

function Login() {
  const cookie = new Cookies();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [userType, setUserType] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleShowInfoModal = (message) => {
    setModalMessage(message);
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  const handleUserTypeChange = (event) => {
    const selectedUserType = event.target.value;
    setUserType(selectedUserType);

    // Controla la visibilidad del campo de contraseña
    setPasswordVisible(selectedUserType !== 'Student');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = userType === 'Student' ? username : formData.get('password');
    
    const response = await fetch('https://localhost:7103/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      cookie.set('fake_cookie', response)   
      if (data.user.role === 'Student') {
        // Almacena los datos del usuario en sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(data.user));
        window.location.href = '/HomeStudent';
      } else if (data.user.role === 'Admin'|| data.user.role === 'Master' ) {
        // Almacena los datos del usuario en sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(data.user));
        window.location.href = '/HomeAdmin';
      }
      
      console.log('Autenticación exitosa');
    } else {
      console.error('Error en la autenticación');
      handleShowInfoModal(data.message);
    }
  };

  return (
    <div className="App bg-green">
      <header className="App-header">
        <h1 className="text-success mt-5">LOGIN</h1>
        <div className="col-md-2 card bg-dark rounded-5 p-4 mt-3">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="typeUser">Tipo usuario:</label>
                <select
                  required
                  className="form-control"
                  id="typeUser"
                  onChange={handleUserTypeChange}
                >
                  <option value="">Selecciona su usuario</option>
                  <option value="Student">Estudiante</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Master">Master</option>
                </select>
              </div>
              <div className="mb-3 text-start fs-5">
                <label htmlFor="exampleInputusername1" className="form-label text-white">Usuario</label>
                <input type="text" className="form-control" name="username" aria-describedby="emailHelp" />
              </div>
              <div className={`mb-3 text-start fs-5 ${passwordVisible ? '' : 'hidden'}`}>
                <label htmlFor="exampleInputPassword1" className="form-label text-white">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                />
              </div>
              <button type="submit" className="btn btn-success">INGRESAR</button>
            </form>
          </div>
        </div>
      </header>

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage}
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

export default Login;
