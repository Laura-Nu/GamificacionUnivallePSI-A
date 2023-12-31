import React from 'react';
import '../Styles/tables.css';

function Ranking() {
  return (
    <div>
     <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="font-weight-bold">Ranking</h2>
          <h4>Lista de estudiantes</h4>
          <button className="btn btn-primary mb-3 btnAdd">Añadir Estudiante</button>
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Rango</th>
                <th>Puntaje</th>
                <th>Carrera</th>
                <th>Sede</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John</td>
                <td>Doe</td>
                <td>Smith</td>
                <td>Estudiante</td>
                <td>90</td>
                <td>Ingeniería</td>
                <td>Sede A</td>
                <td>
                  <button className="btn btn-sm btn-primary">Editar</button>
                  <button className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
   </div>
  );
}

export default Ranking;