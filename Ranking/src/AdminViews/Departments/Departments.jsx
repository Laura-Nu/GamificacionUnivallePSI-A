import React from 'react';
import '../../Styles/tables.css';

function Departments() {
  return (
    
    <div>
     
     <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="font-weight-bold">Departamentos</h2>
          <h4>Lista de departamentos</h4>
          <a href='/CreateDepartments' className="btn btn-success mb-3 btnAdd">Añadir Departamento</a>
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
                  <a href='/UpdateDepartments' className="btn btn-sm btn-warning">Editar</a>
                  <a href='/DeleteDepartments' className="btn btn-sm btn-danger">Eliminar</a>
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

export default Departments;