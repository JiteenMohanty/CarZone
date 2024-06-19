import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './frontend/components/Navbar/Navbar';
import SliderPage from './frontend/components/Slider/SliderPage';
import CarDetailsForm from './frontend/components/CarDetailsForm/CarDetailsForm';
import LoginPage from './frontend/components/Login/LoginPage';
import RegisterPage from './frontend/components/RegisterPage/RegisterPage';
import BuyCarPage from './frontend/components/BuyCarPage/BuyCarPage';
// Import the new BuyCarPage component 
 // Adjust the path if needed

export default function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="main-page">
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route path="/" element={<SliderPage />} />
                    <Route path="/car-details" element={<CarDetailsForm />} />
                    <Route path="/login" element={<LoginPage setUser={setUser} />} /> 
                    <Route path="/register" element={<RegisterPage setUser={setUser} />} />
                    <Route path="/buy-car" element={<BuyCarPage user={user} />} /> 
                </Routes>
                {/* <Footer /> */} 
            </div>
        </Router>
    );
}
