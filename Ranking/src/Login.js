import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';


function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    const response = await fetch('https://localhost:7103/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password}),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.role === 'Student'){
        window.location.href = '/HomeStudent';
      }
      else if (data.role === 'Admin'){
        window.location.href = '/HomeAdmin';
      }
      console.log('Autenticación exitosa');
    } else {
      // Manejar errores de autenticación
      console.error('Error en la autenticación');
      window.alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="App bg-green">
      <header className="App-header">
        <h1 className="text-success mt-5">LOGIN</h1>
        <div className="col-md-2 card bg-dark rounded-5 p-4 mt-3">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start fs-5">
                <label htmlFor="exampleInputusername1" className="form-label text-white">User</label>
                <input type="text" className="form-control" name="username" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3 text-start fs-5">
                <label htmlFor="exampleInputPassword1" className="form-label text-white">Contraseña</label>
                <input type="password" className="form-control" name="password" />
              </div>
              <div className="mb-3 text-start">
                <a href="#" className="fs-6 text-secondary text-decoration-none">¿Olvidaste tu contraseña?</a>
              </div>
              <button type="submit" className="btn btn-success">INGRESAR</button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Login;