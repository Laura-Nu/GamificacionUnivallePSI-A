<<<<<<< HEAD:ranking_estv1.0/src/StudentViews/Badges.js
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
          <a href="#" className="text-end mx-3 fs-4 App-link">CERRAR SESIÓN</a>
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

=======
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/App.css';

import badgeImage from '../images/Badge.jpeg';

function Badges() {
  return (
    <div className="App bg-green">
      <div className="d-flex justify-content-between p-2">
        <p className="text-start mx-3 fs-4">BADGES</p>
        <div className="d-flex">
          <a href="#" className="text-end mx-3 fs-4 App-link">CERRAR SESIÓN</a>
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

>>>>>>> d9636ecf7913d59cd514eb63c5cc84923d70a99b:Ranking/src/StudentViews/Badges.js
