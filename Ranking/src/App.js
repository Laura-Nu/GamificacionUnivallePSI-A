import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import HomeStudent from './StudentViews/HomeStudent';

import { PrivateRoute } from './PrivateRoute';

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

import AddAchievementToStudent from './AdminViews/Achievements/AddToStudent';
import Achievements from './AdminViews/Achievements/Achievements';
import CreateAchievement from './AdminViews/Achievements/Create';
import UpdateAchievement from './AdminViews/Achievements/Update';

import AddSanctionToStudent from './AdminViews/Sanctions/AddToStudent';
import Sanction from './AdminViews/Sanctions/Sanctions';
import CreateSanction from './AdminViews/Sanctions/Create';
import UpdateSanction from './AdminViews/Sanctions/Update';

import AddFromExcel from './AdminViews/Students/AddFromExcel';
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

        <Route path="/HomeStudent" element={
          <PrivateRoute>
            <HomeStudent />
          </PrivateRoute>
        } />

        <Route path="/HomeAdmin" element={
          <PrivateRoute>
            <HomeAdmin />
          </PrivateRoute>
        } />

        <Route path="/CreateAcademicUnits" element={
          <PrivateRoute>
            <CreateAcademicUnits />
          </PrivateRoute>
        } />

        <Route path="/UpdateAcademicUnits/:id" element={
          <PrivateRoute>
            <UpdateAcademicUnits />
          </PrivateRoute>
        } />

        <Route path="/CreateAdmin" element={
          <PrivateRoute>
            <CreateAdmin />
          </PrivateRoute>
        } />

        <Route path="/UpdateAdmin/:id" element={
          <PrivateRoute>
            <UpdateAdmin />
          </PrivateRoute>
        } />

        <Route path="/AddBadgeToStudent/:id" element={
          <PrivateRoute>
            <AddBadgeToStudent />
          </PrivateRoute>
        } />

        <Route path="/CreateBadges" element={
          <PrivateRoute>
            <CreateBadges />
          </PrivateRoute>
        } />

        <Route path="/UpdateBadges/:id" element={
          <PrivateRoute>
            <UpdateBadges />
          </PrivateRoute>
        } />

        <Route path="/CreateCareers" element={
          <PrivateRoute>
            <CreateCareers />
          </PrivateRoute>
        } />

        <Route path="/UpdateCareers/:id" element={
          <PrivateRoute>
            <UpdateCareers />
          </PrivateRoute>
        } />

        <Route path="/CreateDepartments" element={
          <PrivateRoute>
            <CreateDepartments />
          </PrivateRoute>
        } />

        <Route path="/UpdateDepartments/:id" element={
          <PrivateRoute>
            <UpdateDepartments />
          </PrivateRoute>
        } />

        <Route path="/CreateFaculties" element={
          <PrivateRoute>
            <CreateFaculties />
          </PrivateRoute>
        } />

        <Route path="/UpdateFaculties/:id" element={
          <PrivateRoute>
            <UpdateFaculties />
          </PrivateRoute>
        } />

        <Route path="/AddSanctionToStudent/:id" element={
          <PrivateRoute>
            <AddSanctionToStudent />
          </PrivateRoute>
        } />

        <Route path="/CreateSanction" element={
          <PrivateRoute>
            <CreateSanction />
          </PrivateRoute>
        } />

        <Route path="/UpdateSanction/:id" element={
          <PrivateRoute>
            <UpdateSanction />
          </PrivateRoute>
        } />

        <Route path="/AddFromExcel" element={
          <PrivateRoute>
            <AddFromExcel />
          </PrivateRoute>
        } />

        <Route path="/CreateStudent" element={
          <PrivateRoute>
            <CreateStudent />
          </PrivateRoute>
        } />

        <Route path="/UpdateStudent/:id" element={
          <PrivateRoute>
            <UpdateStudent />
          </PrivateRoute>
        } />

        <Route path="/AddAchievementToStudent/:id" element={
          <PrivateRoute>
            <AddAchievementToStudent />
          </PrivateRoute>
        } />

        <Route path="/CreateAchievement" element={
          <PrivateRoute>
            <CreateAchievement />
          </PrivateRoute>
        } />

        <Route path="/UpdateAchievement/:id" element={
          <PrivateRoute>
            <UpdateAchievement />
          </PrivateRoute>
        } />

        <Route path="/*" element={<WithSideBar />} />

      </Routes>
    </Router>
  );
}
function WithSideBar() {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/students" element={<PrivateRoute>
          <Students />
        </PrivateRoute>} />

        <Route path="/admins" element={<PrivateRoute>
          <Admins />
        </PrivateRoute>} />

        <Route path="/careers" element={<PrivateRoute>
          <Careers />
        </PrivateRoute>} />

        <Route path="/departments" element={<PrivateRoute>
          <Departments />
        </PrivateRoute>} />

        <Route path="/faculties" element={<PrivateRoute>
          <Faculties />
        </PrivateRoute>} />

        <Route path="/academic" element={<PrivateRoute>
          <Academic />
        </PrivateRoute>} />

        <Route path="/badge" element={<PrivateRoute>
          <Badge />
        </PrivateRoute>} />

        <Route path="/sanction" element={<PrivateRoute>
          <Sanction />
        </PrivateRoute>} />

        <Route path="/Achievements" element={<PrivateRoute>
          <Achievements />
        </PrivateRoute>} />

        <Route path="/Diamond" element={<PrivateRoute>
          <Diamond />
        </PrivateRoute>} />

        <Route path="/Platinum" element={<PrivateRoute>
          <Platinum />
        </PrivateRoute>} />

        <Route path="/Gold" element={<PrivateRoute>
          <Gold />
        </PrivateRoute>} />

        <Route path="/Silver" element={<PrivateRoute>
          <Silver />
        </PrivateRoute>} />

        <Route path="/Bronze" element={<PrivateRoute>
          <Bronze />
        </PrivateRoute>} />

        <Route path="/Reports" element={<PrivateRoute>
          <Report />
        </PrivateRoute>} />
      </Routes>
    </>
  );
}
export default App;

