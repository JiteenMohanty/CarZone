import React, { useState } from 'react';
import './CarDetailsForm.scss';

export default function CarDetailsForm() {
  const [carDetails, setCarDetails] = useState({
    Name: '',
    Year: '',
    Kilometers_Driven: '',
    Fuel_Type: '', 
    Transmission: '', 
    Owner_Type: '', 
    Mileage: '',
    Engine: '',
    Power: '',
    Seats: '',
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic Input Validation (enhance as needed)
    for (const field in carDetails) {
      if (carDetails[field].trim() === '') {
        setError(`Please fill in all fields.`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Year: parseInt(carDetails.Year, 10),
          Kilometers_Driven: parseInt(carDetails.Kilometers_Driven, 10),
          Fuel_Type: { 'Petrol': 2, 'Diesel': 1, 'CNG': 3, 'LPG': 4 }[carDetails.Fuel_Type] || 0,  
          Transmission: carDetails.Transmission === 'Manual' ? 1 : 2,
          Owner_Type: { 'First': 1, 'Second': 2, 'Third': 3, 'Fourth & Above': 4 }[carDetails.Owner_Type] || 0,
          Seats: parseInt(carDetails.Seats, 10),
          Company: companyNameToCode[carDetails.Name.split(' ')[0]] || 0,
          Mileage: parseFloat(carDetails.Mileage),
          Engine: parseFloat(carDetails.Engine),
          Power: parseFloat(carDetails.Power),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPredictedPrice(data.price);
        setError(null);
      } else {
        throw new Error('Server error occurred');
      }
    } catch (error) {
      console.error('API Error:', error);
      setError(
        error.message === "Failed to fetch"
          ? "Couldn't connect to the server. Please check your connection and try again."
          : error.message || "An error occurred while processing your request. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const companyNameToCode = {
    "Maruti": 1, "Hyundai": 2, "Honda": 3, "Audi": 4, "Nissan": 5, 
    "Toyota": 6, "Volkswagen": 7, "Tata": 8, "Land": 9, "Mitsubishi": 10, "Renault": 11, "Mercedes-Benz": 12, "Bmw": 13, "Mahindra": 14, "Ford": 15, "Porsche": 16, "Datsun": 17, "Jaguar": 18, "Volvo": 19, "Chevrolet": 20, "Skoda": 21, "Mini": 22, "Fiat": 23, "Jeep": 24, "Ambassador": 25, "Isuzu": 26, "Force": 27, "Bentley": 28, "Lamborghini": 29
  };

  // Form Fields Definition (expanded)
  const formFields = [
    { label: 'Car Name (Brand & Model)', name: 'Name', type: 'text' }, 
    { label: 'Year', name: 'Year', type: 'number' },
    { label: 'Kilometers Driven', name: 'Kilometers_Driven', type: 'number' },
    { label: 'Fuel Type', name: 'Fuel_Type', type: 'select', options: ['Petrol', 'Diesel','CNG', 'LPG'] },
    { label: 'Transmission', name: 'Transmission', type: 'select', options: ['Manual', 'Automatic'] },
    { label: 'Owner Type', name: 'Owner_Type', type: 'select', options: ['First', 'Second', 'Third', 'Fourth & Above'] },
    { label: 'Mileage (kmpl)', name: 'Mileage', type: 'float' },
    { label: 'Engine (CC)', name: 'Engine', type: 'float' },
    { label: 'Power (bhp)', name: 'Power', type: 'float' },
    { label: 'Seats', name: 'Seats', type: 'float' },
  ];

  const handleSell = async () => {
    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carDetails), 
      });

      if (response.ok) {
        alert('Car added to the marketplace!');
        // You might want to reset the form or redirect to another page here.
      } else {
        throw new Error('Could not add car to marketplace.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="car-details-form">
      <h2>ENTER CAR DETAILS</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}:</label>
            {field.type === 'select' ? (
              <select name={field.name} value={carDetails[field.name]} onChange={handleChange} required>
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : field.name === 'Name' ? ( 
              <input 
                type={field.type} 
                name={field.name} 
                list="car-names"
                value={carDetails[field.name]} 
                onChange={handleChange} 
                required 
              />
            ) : (
              <input type={field.type} name={field.name} value={carDetails[field.name]} onChange={handleChange} required />
            )}
          </div>
        ))}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Predicting...' : 'Submit'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {predictedPrice && (
        <div className="predicted-price">
          Predicted Price: Rs {predictedPrice.toLocaleString('en-IN')} Lacs
        </div>
      )}
      
      {predictedPrice && (
        <button onClick={handleSell}>Sell Now</button>
      )}
    </div>
  );
}
