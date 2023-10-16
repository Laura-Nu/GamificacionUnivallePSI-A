import React from 'react';
import '../../Styles/tables.css';

function Students() {
  return (
    <div>
     <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="font-weight-bold">Estudiantes</h2>
          <h4>Lista de estudiantes</h4>
          <a href='/CreateStudent' className="btn btn-success mb-3 btnAdd">Añadir Estudiante</a>
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
                  <a href='/UpdateStudent' className="btn btn-sm btn-warning">Editar</a>
                  <a href='/DeleteStudent' className="btn btn-sm btn-danger">Eliminar</a>
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

export default Students;