import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import HomeStudent from './StudentViews/HomeStudent';
import Badges from './StudentViews/Badges';
import AddBadges from './Controllers/AddBadge';
import AddTemporalAdmin from './Controllers/AddTemporalAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomeStudent" element={<HomeStudent />} />
        <Route path="/Badges" element={<Badges />} />
        <Route path="/AddBadges" element={<AddBadges />} />
        <Route path="/AddTemporalAdmin" element={<AddTemporalAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;

