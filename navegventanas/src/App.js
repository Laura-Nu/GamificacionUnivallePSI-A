import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import HomeStudent from './StudentViews/HomeStudent';
import Badges from './StudentViews/Badges';

import CreateAcademicUnits from './AdminViews/AcademicUnits/Create';
import UpdateAcademicUnits from './AdminViews/AcademicUnits/Update';
import DeleteAcademicUnits from './AdminViews/AcademicUnits/Delete';

import CreateAdmin from './AdminViews/Admin/Create';
import UpdateAdmin from './AdminViews/Admin/Update';
import DeleteAdmin from './AdminViews/Admin/Delete';

import AddBadgeToStudent from './AdminViews/Badges/AddToStudent';
import CreateBadges from './AdminViews/Badges/Create';
import UpdateBadges from './AdminViews/Badges/Update';
import DeleteBadges from './AdminViews/Badges/Delete';

import CreateCareers from './AdminViews/Careers/Create';
import UpdateCareers from './AdminViews/Careers/Update';
import DeleteCareers from './AdminViews/Careers/Delete';

import CreateDepartments from './AdminViews/Departments/Create';
import UpdateDepartments from './AdminViews/Departments/Update';
import DeleteDepartments from './AdminViews/Departments/Delete';

import CreateFaculties from './AdminViews/Faculties/Create';
import UpdateFaculties from './AdminViews/Faculties/Update';
import DeleteFaculties from './AdminViews/Faculties/Delete';

import AddPenaltyToStudent from './AdminViews/Penalties/AddToStudent';
import CreatePenalty from './AdminViews/Penalties/Create';
import UpdatePenalty from './AdminViews/Penalties/Update';
import DeletePenalty from './AdminViews/Penalties/Delete';

import CreateStudent from './AdminViews/Students/Create';
import UpdateStudent from './AdminViews/Students/Update';
import DeleteStudent from './AdminViews/Students/Delete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomeStudent" element={<HomeStudent />} />
        <Route path="/Badges" element={<Badges />} />

        <Route path="/CreateAcademicUnits" element={<CreateAcademicUnits />} />
        <Route path="/UpdateAcademicUnits" element={<UpdateAcademicUnits />} />
        <Route path="/DeleteAcademicUnits" element={<DeleteAcademicUnits />} />

        <Route path="/CreateAdmin" element={<CreateAdmin />} />
        <Route path="/UpdateAdmin" element={<UpdateAdmin />} />
        <Route path="/DeleteAdmin" element={<DeleteAdmin />} />

        <Route path="/AddBadgeToStudent" element={<AddBadgeToStudent />} />
        <Route path="/CreateBadges" element={<CreateBadges />} />
        <Route path="/UpdateBadges" element={<UpdateBadges />} />
        <Route path="/DeleteBadges" element={<DeleteBadges />} />

        <Route path="/CreateCareers" element={<CreateCareers />} />
        <Route path="/UpdateCareers" element={<UpdateCareers />} />
        <Route path="/DeleteCareers" element={<DeleteCareers />} />

        <Route path="/CreateDepartments" element={<CreateDepartments />} />
        <Route path="/UpdateDepartments" element={<UpdateDepartments />} />
        <Route path="/DeleteDepartments" element={<DeleteDepartments />} />

        <Route path="/CreateFaculties" element={<CreateFaculties />} />
        <Route path="/UpdateFaculties" element={<UpdateFaculties />} />
        <Route path="/DeleteFaculties" element={<DeleteFaculties />} />

        <Route path="/AddPenaltyToStudent" element={<AddPenaltyToStudent />} />
        <Route path="/CreatePenalty" element={<CreatePenalty />} />
        <Route path="/UpdatePenalty" element={<UpdatePenalty />} />
        <Route path="/DeletePenalty" element={<DeletePenalty />} />

        <Route path="/CreateStudent" element={<CreateStudent />} />
        <Route path="/UpdateStudent" element={<UpdateStudent />} />
        <Route path="/DeleteStudent" element={<DeleteStudent />} />
      </Routes>
    </Router>
  );
}

export default App;

