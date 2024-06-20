import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CarCard.css';

function CarCard({ car }) {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/buy/${car.id}`); 
  };

  return (
    <div className="car-card">
      <img src={car.image_url || 'placeholder_image.jpg'} alt={car.Name} className="car-image" />
      <div className="car-details">
        <h3>{car.Name}</h3>
        <p>Year: {car.Year}</p>
        <p>Price: Rs. {car.Price.toLocaleString('en-IN')}</p>
        <p>Kilometers Driven: {car.Kilometers_Driven}</p>
        {/* ... other car details you want to display (Fuel_Type, Transmission, etc.) */}
        <button onClick={handleBuyClick}>Buy Now</button>
      </div>
    </div>
  );
}

export default CarCard;
