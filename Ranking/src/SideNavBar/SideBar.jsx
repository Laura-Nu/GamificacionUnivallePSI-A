import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faAngleRight, faDesktop, faTable, faTh, faCogs, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './SideNavBar.css';
function SideBar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`side-bar ${isActive ? 'active' : ''}`}>
      <div className="close-btn" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className="menu">
        <div className="item">
          <Link to="/students">
            <FontAwesomeIcon icon={faDesktop} />
            Estudiantes
          </Link>
        </div>
        <div className="item">
          <Link to="/admins" className="sub-btn">
            <FontAwesomeIcon icon={faTable} />
            Administradores
          </Link>
        </div>
        <div className="item">
          <Link to="/academic">
            <FontAwesomeIcon icon={faTh} />
            Unidades Academicas
          </Link>
        </div>
        <div className="item">
          <Link to="/faculties" className="sub-btn">
            <FontAwesomeIcon icon={faCogs} />
            Facultades
          </Link>
        </div>
        <div className="item">
          <Link to="/departments">
            <FontAwesomeIcon icon={faInfoCircle} />
            Departamentos
          </Link>
        </div>
        <div className="item">
          <Link to="/careers">
            <FontAwesomeIcon icon={faInfoCircle} />
            Carreras
          </Link>
        </div>
        <div className="item">
          <Link to="/ranking">
            <FontAwesomeIcon icon={faInfoCircle} />
            Ranking
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;