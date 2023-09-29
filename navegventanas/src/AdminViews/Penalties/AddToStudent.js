import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import info3 from '../../images/info_3.png';

//Add a button to each record in the student table to integrate this view.
function AddToStudent() {
  return (
    <div className="App bg-green">
      <h2>Añadir Sanción a Estudiante</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5'>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input className="form-control border-success border-3 rounded-4" type="text" id="name" name="name" />
            </div>

            <div className="form-group">
              <label htmlFor="levels">Sanción:</label>
              <select className="form-select border-success border-3 rounded-4" id="penaltyType" name="penaltyType">
                <option value="" >Selecciona una opción</option>
                <option value="penalty1">Sanción 1</option>
                <option value="penalty2">Sanción 2</option>
                <option value="penalty3">Sanción 3</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Sanción</button>
          </form>

          <div className='col-md-6 d-flex justify-content-center align-items-center'>
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddToStudent;

