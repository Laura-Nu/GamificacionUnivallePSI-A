import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import info3 from '../../images/info_3.png';

function Create() {
  return (
    <div className="App bg-green">
      <h2>Añadir Estudiantes</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5'>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="name" name="name" />
            </div>
            <div>
              <label htmlFor="lastname" className="form-label">Apellido Paterno:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="lastname" name="lastname" />
            </div>
            <div>
              <label htmlFor="lastname2">Apellido Materno:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="lastname2" name="lastname2" />
            </div>
            <div>
              <label htmlFor="academicUnit">Unidad Académica</label>
              <select className="form-select border-success border-3 rounded-4" aria-label="Selecciona una Unidad Académica" id="academicUnit" name="academicUnit"
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="Tiquipaya">Tiquipaya</option>
                <option value="América">América</option>
                <option value="Trinidad">Trinidad</option>
              </select>
            </div>

            <div>
              <label htmlFor="career">Carrera</label>
              <select className="form-select border-success border-3 rounded-4" aria-label="Selecciona una Carrera" id="career" name="career" >
                <option value="" disabled>Selecciona una opción</option>
                <option value="Carrera1">Carrera 1</option>
                <option value="Carrera2">Carrera 2</option>
                <option value="Carrera3">Carrera 3</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" className="form-control border-success border-3 rounded-4" />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Estudiante</button>
          </form>

          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Create;

