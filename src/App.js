// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarsGroups from './components/CarsGroups/CarsGroups';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SliderPage from './components/Slider/SliderPage';
import CarDetailsForm from './components/CarDetailsForm/CarDetailsForm';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
// import { DATA, DATA2 } from './data/Data';

export default function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="main-page">
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route path="/" element={<SliderPage />} />
                    <Route path="/car-details" element={<CarDetailsForm />} />
                    <Route path="/LoginPage" element={<LoginPage setUser={setUser} />} />
                    <Route path="/RegisterPage" element={<RegisterPage setUser={setUser} />} />
                    {/* Add more routes as needed */}
                </Routes>
                {/* <CarsGroups title="The most searched cars" data={DATA} /> */}
                {/* <CarsGroups title="Latest Cars" data={DATA2} /> */}
                {/* <Footer /> */}
            </div>
        </Router>
    );
}
