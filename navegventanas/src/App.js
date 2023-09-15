import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambiamos 'Switch' por 'Routes'
import HomeStudent from './StudentViews/HomeStudent';
import Badges from './StudentViews/Badges';
import AddBadges from './Controllers/AddBadge';
import AddTemporalAdmin from './Controllers/AddTemporalAdmin';
import DiamondTable from './PyramidTables/Diamond';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeStudent />} />
        <Route path="/Badges" element={<Badges />} />
        <Route path="/AddBadges" element={<AddBadges />} />
        <Route path="/AddTemporalAdmin" element={<AddTemporalAdmin />} />
        <Route path="/DiamondTable" element={<DiamondTable />} />
      </Routes>
    </Router>
  );
}

export default App;

