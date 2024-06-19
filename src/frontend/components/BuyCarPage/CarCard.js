import React from 'react';
import './CarCard.css'; 

function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} className="car-image" />
      <div className="car-details">
        <h3>{car.name}</h3>
        <p>Year: {car.year}</p>
        <p>Price: ${car.price}</p>
        <button onClick={() => { /* Navigate to buy car page with this car's ID */ }}>Buy Now</button>
      </div>
    </div>
  );
}

export default CarCard;
