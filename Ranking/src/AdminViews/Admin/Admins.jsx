import React from 'react';
import '../../Styles/tables.css';

function Admins() {
  return (
    
    <div>
     <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="font-weight-bold">Administradores</h2>
          <h4>Lista de Administradores</h4>
          <a href='/CreateAdmin' className="btn btn-success mb-3 btnAdd">Añadir Administrador</a>
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Rol</th>
                <th>Correo</th>
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
                <td>Administrador</td>
                <td>@gmail.com</td>
                <td>Ingeniería</td>
                <td>Sede A</td>
                <td>
                  <a href='/UpdateAdmin' className="btn btn-sm btn-warning">Editar</a>
                  <a href='/DeleteAdmin' className="btn btn-sm btn-danger">Eliminar</a>
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

export default Admins;