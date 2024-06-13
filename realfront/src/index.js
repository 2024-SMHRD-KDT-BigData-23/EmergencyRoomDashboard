import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from './views/loginpage';
import List from './views/mainpage';
import Detail from './views/detailpage';
import AdminPage from './views/admin-components/dashboardpage';
import DataPage from './views/admin-components/datapage';
import HelpPage from './views/admin-components/helppage';
import RolePage from './views/admin-components/rolepage';
import SuveillancePage from './views/admin-components/surveillancepage';
import ReportPage from './views/admin-components/reportpage';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:pageStatus/List/:patientNameId" element={<List />} />
        <Route path="/Detail/:patientId/:admissionId" element={<Detail />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Data" element={<DataPage />} />
        <Route path="/Help" element={<HelpPage />} />
        <Route path="/Role" element={<RolePage />} />
        <Route path="/Surveillance" element={<SuveillancePage />} />
        <Route path="/Report" element={<ReportPage />} />
      </Routes>
  </Router>
);


reportWebVitals();
