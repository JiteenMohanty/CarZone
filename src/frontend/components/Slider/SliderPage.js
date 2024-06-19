import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SliderPage.scss';
import imagePath from './slider.png';

export default function SliderPage() {
    const navigate = useNavigate();

    const handleSellCarClick = () => {
        navigate('/car-details');
    };

    const handleBuyCarClick = () => {
        // Replace with your actual car listing page route
        navigate('/buy-car'); // Or whichever path is appropriate for your app
    };

    return (
        <div className="slide-page">
            <div className="vehicle-card">
                <button className="vehicle-card-button" onClick={handleSellCarClick}>Sell Your Car</button>
                <button className="vehicle-card-button" onClick={handleBuyCarClick}>Buy a Car</button>
            </div>
            <div className="slide-container">
                <div className="each-slide">
                    <img src={imagePath} alt="Car Slide" />
                </div>
            </div>
        </div>
    );
}
