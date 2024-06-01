import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarsGroups from './components/CarsGroups/CarsGroups';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SliderPage from './components/Slider/SliderPage';
import CarDetailsForm from './components/CarDetailsForm/CarDetailsForm';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

// Assuming you have a DashboardPage component for authenticated users
// import DashboardPage from './components/Dashboard/DashboardPage';

import { DATA, DATA2 } from './data/Data';

export default function App() {
  return (
    <Router>
      <div className="main-page">
        <Navbar />
        <Routes>
          <Route path="/" element={<SliderPage />} />
          <Route path="/car-details" element={<CarDetailsForm />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          {/* Add more routes as needed */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Routes>
        <CarsGroups title="The most searched cars" data={DATA} />
        <CarsGroups title="Latest Cars" data={DATA2} />
        <Footer />
      </div>
    </Router>
  );
}