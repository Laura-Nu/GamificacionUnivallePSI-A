import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/App.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Importa las imágenes
import diamondImage from '../images/diamante.png';
import platinumImage from '../images/platino.png';
import goldImage from '../images/oro.png';
import silverImage from '../images/plata.png';
import bronzeImage from '../images/bronce.png';

import info1 from '../images/info_1.png';
import info3 from '../images/info_3.png';
import info4 from '../images/info_4.png';

import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import whatsapp from '../images/whatsapp.png';
import logo from '../images/Logo.png';

const images = [
  { src: diamondImage, alt: 'Diamante', info: 'DIAMANTE: I: 2800, II: 3000, III: 3200', className: 'small' },
  { src: platinumImage, alt: 'Platino', info: 'PLATINO: I: 2100, II: 2300, III: 2500', className: 'small2' },
  { src: goldImage, alt: 'Oro', info: 'ORO: I: 1400, II: 1600, III: 1800', className: 'small3' },
  { src: silverImage, alt: 'Plata', info: 'PLATA: I: 700, II: 900, III: 1100', className: 'small4' },
  { src: bronzeImage, alt: 'Bronce', info: 'BRONCE: I: 0, II: 200, III: 400', className: 'small5' },
];

function HomeStudent({ location }) {
  const [userBadges, setUserBadges] = useState([]); // Almacena los badges del usuario
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const fullName = `${userData.firstName} ${userData.lastName} ${userData.secondLastName}`
  const userId = JSON.parse(sessionStorage.userData).userId;

  useEffect(() => {
    // Hacer una solicitud al servidor para obtener los badges asociados al usuario
    fetch(`https://localhost:7103/api/StudentBadges/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Aquí asumes que la respuesta del servidor es un arreglo de badges asociados al usuario
        setUserBadges(data);
      })
      .catch((error) => {
        console.error('Error al obtener los badges del usuario', error);
      });
  }, [userId]);

  const handleLogout = async () => {
    try {
      const response = await fetch('https://localhost:7103/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
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
          <a href="#" className="text-end mx-3 fs-4 App-link" onClick={handleLogout}>CERRAR SESIÓN</a>
        </div>
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
              <img src={image.src} alt={image.alt} className={`image border ${image.className}`} />
            </OverlayTrigger>
          ))}
        </div>
        <br /><br />

        {/* Student Information*/}
        <div className="row mt-5">
          <h3 className='mt-5'>ESTUDIANTE</h3><p><br /></p>
          <div className="col-md-4">
            <p className='p-text'>{fullName}</p>
          </div>
          <div className="col-md-8 card card-width rounded-pill mx-5 .card-width">
            <div className="card-body">
              <p className="card-text fs-5">Rango: {userData.rank}</p>
              <p className="card-text fs-5">Cantidad total de puntos: {userData.score}</p>
            </div>
          </div>
        </div>
        <br /><br />

        {/* Badges */}
        <h3 className='mt-5'>BADGES</h3><p><br /></p>
        <div className="row">
          {userBadges.length > 0 ? (
            userBadges.map((badge, index) => (
              <div key={index} className="col-md-4 d-flex justify-content-start align-items-start mx-2">
                {badge.badge && badge.badge.image && (
                  <img
                    src={`https://localhost:7103/api/Images/${badge.badge.image}`}
                    alt={`Badge ${badge.badge.badgeName}`}
                    className="rounded-corner-img rounded-5 badge-image"
                    style={{ width: '200px', height: '200px' }}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>***No cuenta con badges acumulados.***</p>
            </div>
          )}
        </div><br />

        {/* Information */}
        <h3 className='mt-5'>INFORMACIÓN</h3><p><br /></p>
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
          <a href='https://www.instagram.com/univalle_bolivia/' target='_blank'>
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

export default HomeStudent;

