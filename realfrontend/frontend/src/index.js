import React from "react";
import "./assets/scss/style.scss";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { Route,Routes, HashRouter} from "react-router-dom";


import NamNam from "./views/namnam/namnam.jsx";
import Table from "./views/namnam/table.jsx";
import PatientList from "./views/namnam/patientlist.jsx";
import Detail from "./views/namnam/detail.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));

var hist = createBrowserHistory();
root.render(
  <HashRouter history={hist}>
    <Routes>
      <Route path="/Detail" element={<Detail />} />
      <Route path="/List" element={<PatientList />} />
      <Route path="/" element={<NamNam />} />
      <Route path="/Table" element={<Table />} />


    </Routes>
  </HashRouter>
);


reportWebVitals();
