import React, {Fragment} from 'react';
//aca llamamos a el archivo css
import './styleLogin.css';

const Login = () => {
  // Aquí va el código del componente  
  return (
    <Fragment>
      <section>
        <div className="signin">
          <div className="content">
            <h2>Sign In</h2>
            <div className="form">

              <div className="inputBox">
                <input type="text" required />
                <i>Username</i>
              </div>

              <div className="inputBox">
                <input type="password" required />
                <i>Password</i>
              </div>

              <div class="links">   
                <a href="#">Forgot Password?</a> 
                <a href="#">Sign-Up</a> 

              </div>

              <div className="inputBox">
                <input type="submit" value="Login" />
                
              </div>
            </div>

          </div>

        </div>

      </section>


    </Fragment>
  );
}

export default Login;