import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDesktop, faTable, faTh, faCogs, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './SideNavBar.css';
function SideBar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

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
    <div className={`side-bar ${isActive ? 'active' : ''}`}>
      <div className="close-btn" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className="menu">
      <div className="item">
          <Link to="/HomeAdmin">
            <FontAwesomeIcon icon={faDesktop} />
            Inicio
          </Link>
        </div>
        <div className="item">
          <Link to="/admins" className="sub-btn">
            <FontAwesomeIcon icon={faTable} />
            Administradores
          </Link>
        </div>
        <div className="item">
          <Link to="/careers">
            <FontAwesomeIcon icon={faInfoCircle} />
            Carreras
          </Link>
        </div>
        <div className="item">
          <Link to="/departments">
            <FontAwesomeIcon icon={faInfoCircle} />
            Departamentos
          </Link>
        </div>
        <div className="item">
          <Link to="/students">
            <FontAwesomeIcon icon={faDesktop} />
            Estudiantes
          </Link>
        </div>
        <div className="item">
          <Link to="/badge">
            <FontAwesomeIcon icon={faDesktop} />
            Insignias
          </Link>
        </div>
        <div className="item">
          <Link to="/faculties" className="sub-btn">
            <FontAwesomeIcon icon={faCogs} />
            Facultades
          </Link>
        </div>
        <div className="item">
          <Link to="/Reports" className="sub-btn">
            <FontAwesomeIcon icon={faTable} />
            Reportes
          </Link>
        </div>
        <div className="item">
          <Link to="/sanction" className="sub-btn">
            <FontAwesomeIcon icon={faTable} />
            Sanciones
          </Link>
        </div>
        <div className="item">
          <Link to="/academic">
            <FontAwesomeIcon icon={faTh} />
            Sedes
          </Link>
        </div>
        <div className="item">
          <Link to="#"  onClick={handleLogout} className="sub-btn">
            <FontAwesomeIcon icon={faTable} />
            Cerrar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;