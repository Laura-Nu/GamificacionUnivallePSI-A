import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';

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
  { src: diamondImage, alt: 'Diamante', className: 'small', href:'#'},
  { src: platinumImage, alt: 'Platino', className: 'small2', href:'#' },
  { src: goldImage, alt: 'Oro', className: 'small3', href:'#' },
  { src: silverImage, alt: 'Plata', className: 'small4', href:'#' },
  { src: bronzeImage, alt: 'Bronce', className: 'small5', href:'#' },
];

function HomeAdmin() {
  return (
    <div className="App bg-green">
      <div className="d-flex justify-content-between p-2">
        <div className='d-flex'>
          <img src={logo} alt="Imagen 1" className="logo" />
          <p className="text-start mx-3 fs-4">RANKING ESTUDIANTIL</p>
        </div>
        <div className="d-flex">
          <a href="/Students" className="text-end mx-3 fs-4 App-link">EDITAR</a>
          <a href="#" className="text-end mx-3 fs-4 App-link">CERRAR SESIÓN</a>
        </div>
      </div>

      <header className="App-header">
        {/* Pyramid */}
        <div className="image-column mt-5">
        {images.map((image, index) => (
            <a href={image.href}>
                <img src={image.src} alt={image.alt} className={`image border ${image.className}`} />
            </a>
              
          ))}
        </div>
        <br /><br />

        {/* Information */}
        <h3 className='mt-5'>INFORMACIÓN</h3>
        <div className="row justify-content-center mb-5">
          <div className="col-md-3 mx-5">
            <img src={info3} alt="Imagen 1" className="img-fluid image-info m-3" />
            <h4>RANKING ESTUDIANTIL</h4>
            <p class="fs-6">El ranking estudiantil es una carrera entre estudiantes para medir los logros que ganen en su etapa de estudio.</p>
          </div>
          <div className="col-md-3 mx-5">
            <img src={info1} alt="Imagen 2" className="img-fluid image-info m-3" />
            <h4>CÓMO SUBIR DE RANGO</h4>
            <p class="fs-6">Se podrá subir de rango dependiende de los logros que gane y de las materias que apruebe.</p>
          </div>
          <div className="col-md-3 mx-5">
            <img src={info4} alt="Imagen 3" className="img-fluid image-info m-3" />
            <h4>CÓMO PARTICIPO</h4>
            <p class="fs-6">Cada estudiante inscripto participa iniciando en el rango más bajo.</p>
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

export default HomeAdmin;

