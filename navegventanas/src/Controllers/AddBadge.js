import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import Estudiante from './Range';

const badges = {
  ExcelenciaAcademica: { I: 3, II: 8 },
  Honor: { I: 3, II: 8 },
  ActividadesExtracurriculares: { I: 3, II: 8 },
  Liderazgo: { I: 3, II: 8 },
  Investigacion: { I: 3, II: 8 },
  HabilidadesDigitales: { I: 3, II: 8 },
  ExcelenciaDeportiva: { I: 3, II: 8 },
  LogroInternacional: { I: 3, II: 8 },
};

function Range() {
  const [inputValue, setInputValue] = useState('');
  const [badgeSeleccionado, setBadgeSeleccionado] = useState('');
  const [resultados, setResultados] = useState([]);
  const [student, setStudent] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal

  const handleInputChange = (e) => {
    const texto = e.target.value;
    setInputValue(texto);
    const resultadosFiltrados = buscarResultados(texto);
    setResultados(resultadosFiltrados);
  };

  const handleBadgeChange = (e) => {
    const badge = e.target.value;
    setBadgeSeleccionado(badge);
    const resultadosFiltrados = buscarResultados(inputValue, badge);
    setResultados(resultadosFiltrados);
  };

  const buscarResultados = (texto) => {
    return ['Resultado 1', 'Resultado 2', 'Resultado 3'].filter((resultado) =>
      resultado.toLowerCase().includes(texto.toLowerCase())
    );
  };

  const handleResultadoClick = (resultado) => {
    setStudent(resultado);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAgregarClick = () => {
    setShowModal(true);
  };

  return (
    <div className="App bg-green">
      <header className="App-header">
        
        <Estudiante puntos={5000} />


        <div className='form-group'>
          <input className="form-control"
            type="text"
            placeholder="Buscar..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <select onChange={handleBadgeChange} value={badgeSeleccionado}>
            <option value="">Seleccionar Badge</option>
            {Object.keys(badges).map((badgeNombre) => (
              <option key={badgeNombre} value={badgeNombre}>
                {badgeNombre}
              </option>
            ))}
          </select>
          <ul>
            {resultados.map((resultado, index) => (
              <li key={index} onClick={() => handleResultadoClick(resultado)}>
                {resultado}
              </li>
            ))}
          </ul>
          <label>Estudiante:</label>
          <input className="form-control"
            type="text"
            placeholder="Student"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
          <button type="button" className="btn btn-success" onClick={handleAgregarClick}>
            Agregar
          </button>
        </div>
      </header> 
      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Datos del Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Nombre: {student}</p>
          <p>Badge Seleccionado: {badgeSeleccionado}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Range;
