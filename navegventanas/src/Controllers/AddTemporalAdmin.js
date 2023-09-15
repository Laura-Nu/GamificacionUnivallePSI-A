import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App2() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    lastname2: '',
    career: '',
    academicUnit: '',
    email: '',
    days: new Date(),
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      days: date,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="App bg-green">
      <h1>Administradores</h1>
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastname" className="form-label">Apellido Paterno:</label>
            <input
              className="form-control"
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastname2">Apellido Materno:</label>
            <input
              className="form-control"
              type="text"
              id="lastname2"
              name="lastname2"
              value={formData.lastname2}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="academicUnit">Unidad Académica</label>
            <select
              className="form-select"
              aria-label="Selecciona una Unidad Académica"
              id="academicUnit"
              name="academicUnit"
              value={formData.academicUnit}
              onChange={handleInputChange}
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="Tiquipaya">Tiquipaya</option>
              <option value="América">América</option>
              <option value="Trinidad">Trinidad</option>
            </select>
          </div>

          <div>
            <label htmlFor="career">Carrera</label>
            <select
              className="form-select"
              aria-label="Selecciona una Carrera"
              id="career"
              name="career"
              value={formData.career}
              onChange={handleInputChange}
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="Carrera1">Carrera 1</option>
              <option value="Carrera2">Carrera 2</option>
              <option value="Carrera3">Carrera 3</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="days">Fecha:</label>
            <DatePicker
              selected={formData.days}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy" // Formato de fecha (puedes ajustarlo)
            />
          </div>
          <button type="submit" className="btn btn-success">Agregar</button>
        </form>
        
      </header>
        
       {/* Modal */}
       <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Se ha agregado con éxito al administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Correo electrónico: {formData.email}</p>
          <p>Hasta el: {formData.days.toLocaleDateString()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App2;
