
import React from 'react';
import { Link } from 'react-router-dom';

import './hedaer.css';
import './body.css';
import './footer.css';
function Header() {
  return (
    <nav className="header">
      <div className="logo"></div>
      <div className="app-name">Ranking Estudiantil</div>
      <Link to="/students" className="edit-button" >Editar</Link>
      <button className="logout-button" href="~/Login/Logout">Cerrar Sesión</button>
    </nav>
  );
}



function Body() {
  return (
    <div className="body-home">
      <div className="image-pyramid">
        <img src="#" alt="Diamente"/>
        <img src="#" alt="PLATINO"/>
        <img src="#" alt="ORO"/>
        <img src="#" alt="PLATA" />
        <img src="#" alt="BRONCE" />
      </div>
      <br />
      <br />
      <h1>INFORMACIÓN</h1>
      <br />
      <br />
      <div class="container" className="horizontal-images">
    <div class="row">
        <div class="col-4">
        <div className="left-image">
          <img src='./img/info_2.png' alt="#"   />
          <p class="tituloP">RANKING ESTUDIANTIL</p>
          <p>El ranking estudiantil es una carrera<br /> entre estudiantes para medir los logros <br />que ganen en su etapa de estudio.</p>
        </div>
        </div>
        <div class="col-4">
        <div className="center-image">
          <img src='./img/info_3.png' alt="#" />
          <p class="tituloP">COMO SUBIR DE RANGO</p>
          <p>Se podrá subir de rango dependiende de<br /> los logros que gane y de las materias que apruebe.</p>
        </div>
            
        </div>
        <div class="col-4">
        <div className="right-image">
          <img src='./img/info_4.png' alt="#" />
          <p class="tituloP">COMO PARTICIPO</p>
          <p>Cada estudiante inscripto participa<br /> iniciando en el rango más bajo.</p>
        </div>
        </div>
    </div>
</div>
    </div>
  );
}


function Footer() {
  return (
    <nav className="footer">
      <button className="contact-button">CONTACTO</button>
      <div className="social-icons">
        <div>
        <button className="facebook-button" href="https://www.facebook.com/UnivalleBolivia/">Facebook</button>
        </div>
        <div>
        <button className="instagram-button " href="https://www.instagram.com/univalle_bolivia/">Instagram</button>
        </div>
        <div>
        <button className="whatsapp-button">WhatsApp</button>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;