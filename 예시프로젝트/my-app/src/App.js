import React from "react";
import "./assets/scss/css.scss";
import { createRoot } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import App from "./components/mainpage";
import Maincopy from "./components/sections/maincopy";

const root = createRoot(document.getElementById('root'));

// var hist = createBrowserHistory();
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Maincopy />} />
    </Routes>
  </Router>
);

reportWebVitals();
