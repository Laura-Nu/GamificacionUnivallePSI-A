import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/App.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Importa las imágenes
import diamondImage from '../images/diamante.png';
import platinumImage from '../images/platino.png';
import goldImage from '../images/oro.png';
import silverImage from '../images/plata.png';
import bronzeImage from '../images/bronce.png';
import userImage from '../images/user.png';

import info1 from '../images/info_1.png';
import info3 from '../images/info_3.png';
import info4 from '../images/info_4.png';

import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import whatsapp from '../images/whatsapp.png';
import logo from '../images/Logo.png';

const images = [
  { src: diamondImage, alt: 'Diamante', info: 'DIAMANTE: I: 6000, II: 6500, III: 7000', className: 'small' },
  { src: platinumImage, alt: 'Platino', info: 'PLATINO: I: 4500, II: 5000, III: 5500', className: 'small2' },
  { src: goldImage, alt: 'Oro', info: 'ORO: I: 3000, II: 3500, III: 4000', className: 'small3' },
  { src: silverImage, alt: 'Plata', info: 'PLATA: I: 1500, II: 2000, III: 2500', className: 'small4' },
  { src: bronzeImage, alt: 'Bronce', info: 'BRONCE: I: 0, II: 500, III: 1000', className: 'small5' },
];

function HomeStudent({location}) {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const fullName = `${userData.firstName} ${userData.lastName} ${userData.secondLastName}`
  return (
    <div className="App bg-green">
      <div className="d-flex justify-content-between p-2">
        <div className='d-flex'>
          <img src={logo} alt="Imagen 1" className="logo" />
          <p className="text-start mx-3 fs-4">RANKING ESTUDIANTIL</p>
        </div>
        <div className="d-flex">
          <a href="/Badges" className="text-end mx-3 fs-4 App-link">BADGES</a>
          <a href="#" className="text-end mx-3 fs-4 App-link">CERRAR SESIÓN</a>
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
        <div className="row g-0 mt-5">
          <div className="col-md-4 mt-4">
            <img src={userImage} className="img-fluid rounded-start image-width rounded-circle mx-5" alt="..." />
            <p>{fullName}</p>
          </div>
          <div className="col-md-8 card card-width rounded-pill mx-5">
            <div className="card-body">
              <p className="card-text fs-5">Rango: {userData.rank}</p>
              <p className="card-text fs-5">Cantidad total de puntos: {userData.score}</p>
              <p className="card-text fs-5">Puntos restantes para el siguiente nivel: Y</p>
              <p className="card-text fs-5">Badges acumulados: 2</p>
            </div>
          </div>
        </div>
        <br /><br />

        {/* Information */}
        <h3 className='mt-5'>INFORMACIÓN</h3>
        <div className="row justify-content-center mb-5">
          <div className="col-md-3 mx-5">
            <img src={info3} alt="Imagen 1" className="img-fluid image-info m-3" />
            <h4>RANKING ESTUDIANTIL</h4>
            <p className="fs-6">El ranking estudiantil es una carrera entre estudiantes para medir los logros que ganen en su etapa de estudio.</p>
          </div>
          <div className="col-md-3 mx-5">
            <img src={info1} alt="Imagen 2" className="img-fluid image-info m-3" />
            <h4>CÓMO SUBIR DE RANGO</h4>
            <p className="fs-6">Se podrá subir de rango dependiende de los logros que gane y de las materias que apruebe.</p>
          </div>
          <div className="col-md-3 mx-5">
            <img src={info4} alt="Imagen 3" className="img-fluid image-info m-3" />
            <h4>CÓMO PARTICIPO</h4>
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

