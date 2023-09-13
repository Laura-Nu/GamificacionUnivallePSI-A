import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Home from './Home';
import Users from './Users';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path="/
          " element={<Login />} />
  
           <Route path="/home" element={<Home />} />
  
            <Route path="/users" element={<Users />} />

        </Routes>

      </BrowserRouter> 
      
    </div>
  );
}
 
export default App;
