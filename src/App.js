import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Footer from './components/Footer/Footer';
import Navbar from './frontend/components/Navbar/Navbar';
import SliderPage from './frontend/components/Slider/SliderPage';
import CarDetailsForm from './frontend/components/CarDetailsForm/CarDetailsForm';
import LoginPage from './frontend/components/Login/LoginPage';
import RegisterPage from './frontend/components/RegisterPage/RegisterPage';


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
                </Routes>
                {/* <Footer /> */}
            </div>
        </Router>
    );
}
