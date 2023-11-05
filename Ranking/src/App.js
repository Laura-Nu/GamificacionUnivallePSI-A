import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import HomeStudent from './StudentViews/HomeStudent';

import CreateAcademicUnits from './AdminViews/AcademicUnits/Create';
import UpdateAcademicUnits from './AdminViews/AcademicUnits/Update';

import CreateAdmin from './AdminViews/Admin/Create';
import UpdateAdmin from './AdminViews/Admin/Update';

import AddBadgeToStudent from './AdminViews/Badges/AddToStudent';
import Badge from './AdminViews/Badges/Badges';
import CreateBadges from './AdminViews/Badges/Create';
import UpdateBadges from './AdminViews/Badges/Update';

import CreateCareers from './AdminViews/Careers/Create';
import UpdateCareers from './AdminViews/Careers/Update';

import CreateDepartments from './AdminViews/Departments/Create';
import UpdateDepartments from './AdminViews/Departments/Update';

import CreateFaculties from './AdminViews/Faculties/Create';
import UpdateFaculties from './AdminViews/Faculties/Update';

import AddSanctionToStudent from './AdminViews/Sanctions/AddToStudent';
import Sanction from './AdminViews/Sanctions/Sanctions';
import CreateSanction from './AdminViews/Sanctions/Create';
import UpdateSanction from './AdminViews/Sanctions/Update';

import CreateStudent from './AdminViews/Students/Create';
import UpdateStudent from './AdminViews/Students/Update';
import Report from './AdminViews/Reports/Report';

import HomeAdmin from './HomeAdmin';
import Students from './AdminViews/Students/Students';
import Admins from './AdminViews/Admin/Admins';
import Careers from './AdminViews/Careers/Carrers';
import Departments from './AdminViews/Departments/Departments';
import Faculties from './AdminViews/Faculties/Facultys';
import Academic from './AdminViews/AcademicUnits/Academic';
import SideBar from './SideNavBar/SideBar';

import Diamond from './Ranking/Diamond';
import Platinum from './Ranking/Platinum';
import Gold from './Ranking/Gold';
import Silver from './Ranking/Silver';
import Bronze from './Ranking/Bronze';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomeStudent" element={<HomeStudent />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/*" element={<WithSideBar />} />

        <Route path="/CreateAcademicUnits" element={<CreateAcademicUnits />} />
        <Route path="/UpdateAcademicUnits/:id" element={<UpdateAcademicUnits />} />

        <Route path="/CreateAdmin" element={<CreateAdmin />} />
        <Route path="/UpdateAdmin/:id" element={<UpdateAdmin />} />

        <Route path="/AddBadgeToStudent/:id" element={<AddBadgeToStudent />} />
        <Route path="/CreateBadges" element={<CreateBadges />} />
        <Route path="/UpdateBadges/:id" element={<UpdateBadges />} />

        <Route path="/CreateCareers" element={<CreateCareers />} />
        <Route path="/UpdateCareers/:id" element={<UpdateCareers />} />

        <Route path="/CreateDepartments" element={<CreateDepartments />} />
        <Route path="/UpdateDepartments/:id" element={<UpdateDepartments />} />

        <Route path="/CreateFaculties" element={<CreateFaculties />} />
        <Route path="/UpdateFaculties/:id" element={<UpdateFaculties />} />

        <Route path="/AddSanctionToStudent/:id" element={<AddSanctionToStudent />} />
        <Route path="/CreateSanction" element={<CreateSanction />} />
        <Route path="/UpdateSanction/:id" element={<UpdateSanction />} />

        <Route path="/CreateStudent" element={<CreateStudent />} />
        <Route path="/UpdateStudent/:id" element={<UpdateStudent />} />

      </Routes>
    </Router>
  );
}
function WithSideBar() {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/faculties" element={<Faculties />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/badge" element={<Badge />} />
        <Route path="/sanction" element={<Sanction />} />

        <Route path="/Diamond" element={<Diamond />} />
        <Route path="/Platinum" element={<Platinum />} />
        <Route path="/Gold" element={<Gold />} />
        <Route path="/Silver" element={<Silver />} />
        <Route path="/Bronze" element={<Bronze />} />

        <Route path="/Reports" element={<Report />} />
      </Routes>
    </>
  );
}
export default App;

