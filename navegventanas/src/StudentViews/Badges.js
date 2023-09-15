import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import badgeImage from '../images/Badge.jpeg';

function Badges() {
  return (
    <div className="App bg-green">
      <div className="d-flex justify-content-between p-2">
        <p className="text-start mx-3 fs-4">BADGES</p>
        <div className="d-flex">
          <p className="text-end mx-3 fs-4">CERRAR SESIÓN</p>
          <a href="/AddBadges" className="text-end mx-3 fs-4 App-link">AÑADIR BADGES</a>
          <a href="/AddTemporalAdmin" className="text-end mx-3 fs-4 App-link">AÑADIR ADMIN TEMPORAL</a>
        </div>
      </div>

      <header className="App-header">
        <div className="row">
          <div className="col-md-4 d-flex justify-content-start align-items-start m-5">
            <img src={badgeImage} alt="Imagen 1" className="rounded-corner-img rounded-5" />
            <img src={badgeImage} alt="Imagen 2" className="rounded-corner-img rounded-5 mx-5" />
          </div>
        </div>

      </header>

    </div>
  );
}

export default Badges;

