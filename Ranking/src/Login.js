import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';


function Login() {
  return (
    <div className="App bg-green">
      <header className="App-header">
        <h1 className="text-success mt-5">LOGIN</h1>
        <div class="col-md-2 card bg-dark rounded-5 p-4 mt-3">
          <div class="card-body">
            <form action="/HomeAdmin">
              <div class="mb-3 text-start fs-5">
                <label for="exampleInputEmail1" class="form-label text-white">Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div class="mb-3 text-start fs-5">
                <label for="exampleInputPassword1" class="form-label text-white">Contraseña</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
              </div>
              <div class="mb-3 text-start">
                <a href="#" class="fs-6 text-secondary text-decoration-none">¿Olvidaste tu contraseña?</a>
              </div>
              <button type="submit" class="btn btn-success">INGRESAR</button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Login;