import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function Delete() {
  return (
    <div className="App bg-green">
        <h2 className='mx-3 p-3'>ADVERTENCIA</h2>
      <header className="App-header">
        <p className='mt-5 fs-1'>¿Seguro que quiere eliminar este registro?</p>
        <img src={info3} alt="Imagen 1" className="img-fluid image-info" />
        <div className='row mt-5'>
            <div className='col-md-5 mx-3'>
            <button type="submit" className="btn btn-success fs-3">Confirmar</button>
            </div>
            <div className='col-md-5 mx-3'>
            <button type="submit" className="btn btn-success fs-3">Cancelar</button>
            </div>
        </div>
      </header>
    </div>
  );
}

export default Delete;

