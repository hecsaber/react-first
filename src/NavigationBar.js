import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Article from "./Article";
import Datum from './Datum';

const NavigationBar = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/datum" element={<Datum />} />
      </Routes>
    </Router>
  )
}

export default NavigationBar;