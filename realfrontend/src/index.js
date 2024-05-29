import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from './views/loginpage';
import List from './views/mainpage';
import Search from './views/searchpage';
import AllList from './views/allpatientspage';
import Detail from './views/detailpage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/List" element={<List />} />
      <Route path="/Search" element={<Search />} />
      <Route path="/AllList" element={<AllList />} />
      <Route path="/Detail" element={<Detail />} />
    </Routes>
  </Router>
);


reportWebVitals();
