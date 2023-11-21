import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import { Modal, Button } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Cookies from 'universal-cookie';

// Importa las imágenes
import diamondImage from './images/diamante.png';
import platinumImage from './images/platino.png';
import goldImage from './images/oro.png';
import silverImage from './images/plata.png';
import bronzeImage from './images/bronce.png';

import info1 from './images/info_1.png';
import info3 from './images/info_3.png';
import info4 from './images/info_4.png';

import facebook from './images/facebook.png';
import instagram from './images/instagram.png';
import whatsapp from './images/whatsapp.png';
import logo from './images/Logo.png';

const images = [
  { src: diamondImage, alt: 'Diamante', info: 'DIAMANTE: I: 2800, II: 3000, III: 3200', className: 'small', href: '/Diamond' },
  { src: platinumImage, alt: 'Platino', info: 'PLATINO: I: 2100, II: 2300, III: 2500', className: 'small2', href: '/Platinum' },
  { src: goldImage, alt: 'Oro', info: 'ORO: I: 1400, II: 1600, III: 1800', className: 'small3', href: '/Gold' },
  { src: silverImage, alt: 'Plata', info: 'PLATA: I: 700, II: 900, III: 1100', className: 'small4', href: '/Silver' },
  { src: bronzeImage, alt: 'Bronce', info: 'BRONCE: I: 0, II: 200, III: 400', className: 'small5', href: '/Bronze' },
];

function HomeAdmin() {
  

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const cookies = new Cookies();
  console.log(userData);

  const handleShowPasswordModal = () => {
    setShowPasswordModal(true);
    setCurrentPassword('');
    setNewPassword('');
    setErrorMessage('');
    setShowSuccessMessage(false);
  };

  const handleCloseAlerts = () => {
    setShowSuccessMessage(false);
    setErrorMessage('');
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch('https://localhost:7103/api/User/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.userId,
          currentPassword: currentPassword,
          newPassword: newPassword,

          
        }),
        
      });

      if (response.ok) {
        // Contraseña cambiada con éxito, muestra un mensaje de éxito.
        setShowSuccessMessage(true);
        setRedirectMessage('Redirigiendo en 5 segundos');
        setIsRedirecting(true);

        // Cerrar el mensaje de éxito automáticamente después de 2 segundos
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);

        

        setTimeout(() => {
          // Realiza la redirección después de 5 segundos
          handleLogout();
        }, 2000);
      } else {
        const data = await response.json();
        // Mostrar un mensaje de error si la contraseña no se pudo cambiar.
        setErrorMessage(data.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
      }
    } catch (error) {
      // Manejar cualquier error de red u otro error.
      console.log(userData.id);
      setErrorMessage('Revisa tu contraseña actual');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://localhost:7103/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        cookies.remove('fake_cookie');
        window.location.href = '/';
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };
  
  return (
    <div className="App bg-green">
      <div className="d-flex justify-content-between p-2">
        <div className='d-flex'>
          <img src={logo} alt="Imagen 1" className="logo" />
          <p className="text-start mx-3 fs-4">RANKING ESTUDIANTIL</p>
        </div>
        <div className="d-flex">
          <a href="/Students" className="text-end mx-3 fs-4 App-link">EDITAR</a>
          <a href="#" className="text-end mx-3 fs-4 App-link" onClick={handleShowPasswordModal}>
            CAMBIAR CONTRASEÑA
          </a>
          <a href="#" className="text-end mx-3 fs-4 App-link" onClick={handleLogout}>CERRAR SESIÓN</a>
        </div>

        
        <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">
              Contraseña Actual
            </label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Nueva Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {showSuccessMessage && (
            <div className="alert alert-success" role="alert">
              Contraseña cambiada con éxito.
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="success" onClick={handleChangePassword}>
            Cambiar Contraseña
          </Button>
        </Modal.Footer>
      </Modal>
      

      </div>

      <header className="App-header">
        {/* Pyramid */}
        <div className="image-column mt-5">
          {images.map((image, index) => (
            <OverlayTrigger
              key={index}
              placement="right"
              overlay={<Tooltip>{image.info}</Tooltip>}
            >
              <a href={image.href}>
                <img src={image.src} alt={image.alt} className={`image border ${image.className}`} />
              </a>
            </OverlayTrigger>
          ))}
        </div>
        <br /><br />

        {/* Information */}
        <h3 className='mt-5'>INFORMACIÓN</h3>
        <div className="row justify-content-center mb-5">
          <div className="col-md-3 mx-5">
            <img src={info3} alt="Imagen 1" className="img-fluid image-info m-3" />
            <h4 className='text-center'>RANKING ESTUDIANTIL</h4>
            <p className="fs-6">El ranking estudiantil es una carrera entre estudiantes para medir los logros que ganen en su etapa de estudio.</p>
          </div>
          <div className="col-md-3 mx-5">
            <img src={info1} alt="Imagen 2" className="img-fluid image-info m-3" />
            <h4 className='text-center'>CÓMO SUBIR DE RANGO</h4>
            <p className="fs-6">Se podrá subir de rango dependiende de los logros que gane y de las materias que apruebe.</p>
          </div>
          <div className="col-md-3 mx-5">
            <img src={info4} alt="Imagen 3" className="img-fluid image-info m-3" />
            <h4 className='text-center'>CÓMO PARTICIPO</h4>
            <p className="fs-6">Cada estudiante inscripto participa iniciando en el rango más bajo.</p>
          </div>
        </div>
      </header>

      <div className="d-flex justify-content-center align-items-center p-2" style={{ width: '100%' }}>
        <div className="d-flex justify-content-center align-items-center">
          <a href='https://www.instagram.com/univalle_bolivia/' target="_blank">
            <img src={instagram} alt="Imagen 1" className="icon image" />
          </a>
          <a href='https://web.whatsapp.com/' target='_blank'>
            <img src={whatsapp} alt="Imagen 2" className="icon image" />
          </a>

          <a href='https://es-la.facebook.com/UnivalleBolivia/events' target='_blank'>
            <img src={facebook} alt="Imagen 3" className="icon image" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;

