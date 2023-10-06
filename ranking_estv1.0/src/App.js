import './App.css';
import Login from './Login';
import Home from './Home';
import Students from './Tables/Students';
import Admins from './Tables/Admins';
import Carrers from './Tables/Carrers';
import Departments from './Tables/Departments';
import Facultys from './Tables/Facultys';
import Ranking from './Tables/Ranking';
import Academic from './Tables/Academic';
import SideBar from './SideNavBar/SideBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<WithSideBar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function WithSideBar() {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/carrers" element={<Carrers />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/facultys" element={<Facultys />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/academic" element={<Academic />} />
      </Routes>
    </>
  );
}
export default App;
