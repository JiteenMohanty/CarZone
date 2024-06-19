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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({ ...carDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input Validation (Example - You can add more specific validation)
        if (Object.values(carDetails).some(val => val === '')) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('predict', { // Assuming your Flask API is running locally
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carDetails),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setPredictedPrice(data.price);
            setError(null); 
        } catch (error) {
            console.error('API Error:', error);
            setError(error.message); 
        }
    };

    const formFields = [
        { label: 'Car Name (Brand & Model)', name: 'Name', type: 'text', options: [] },
        { label: 'Year', name: 'Year', type: 'number', options: [] },
        { label: 'Kilometers Driven', name: 'Kilometers_Driven', type: 'number', options: [] },
        { label: 'Fuel Type', name: 'Fuel_Type', type: 'select', options: ['Diesel', 'Petrol', 'CNG', 'LPG'] },
        { label: 'Transmission', name: 'Transmission', type: 'select', options: ['Manual', 'Automatic'] },
        { label: 'Owner Type', name: 'Owner_Type', type: 'select', options: ['First', 'Second', 'Third', 'Fourth & Above'] },
        { label: 'Mileage (kmpl)', name: 'Mileage', type: 'number', options: [] },
        { label: 'Engine (CC)', name: 'Engine', type: 'number', options: [] },
        { label: 'Power (bhp)', name: 'Power', type: 'number', options: [] },
        { label: 'Seats', name: 'Seats', type: 'number', options: [] },
    ];

    return (
        <div className="car-details-form">
            <h2>Enter Car Details</h2>
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
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={carDetails[field.name]}
                                onChange={handleChange}
                                required
                            />
                        )}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
            {predictedPrice && <p>Predicted Price: Rs {predictedPrice.toLocaleString('en-IN')}</p>}
        </div>
    );
}

