import React, { useState } from 'react';
import './CarDetailsForm.scss';

export default function CarDetailsForm() {
    const [carDetails, setCarDetails] = useState({
        Sales_ID: '',
        Car_Brand: '',
        Car_Model: '',
        Car_Variant: '',
        Year: '',
        Selling_Price: '',
        km_Driven: '',
        Mileage: '',
        Engine: '',
        Max_Power: '',
        Seats: '',
        Fuel: '',
        Transmission: '',
        Owner: '',
        Seller_Type: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({ ...carDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(carDetails);
    };

    return (
        <div className="car-details-form">
            <h2>Enter Car Details</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(carDetails).map((key) => {
                    if (['Seats', 'Fuel', 'Transmission', 'Owner', 'Seller_Type'].includes(key)) {
                        return (
                            <div key={key} className="form-group">
                                <label htmlFor={key}>{key.replace('_', ' ')}:</label>
                                <select name={key} value={carDetails[key]} onChange={handleChange} required>
                                    {key === 'Seats' && (
                                        <>
                                            <option value="">Select Seats</option>
                                            <option value="2">2 seater</option>
                                            <option value="4">4 seater</option>
                                            <option value="5">5 seater</option>
                                            <option value="6">6 seater</option>
                                            <option value="7">7 seater</option>
                                        </>
                                    )}
                                    {key === 'Fuel' && (
                                        <>
                                            <option value="">Select Fuel Type</option>
                                            <option value="petrol">Petrol</option>
                                            <option value="diesel">Diesel</option>
                                            <option value="CNG">CNG</option>
                                            <option value="hybrid">Hybrid</option>
                                        </>
                                    )}
                                    {key === 'Transmission' && (
                                        <>
                                            <option value="">Select Transmission</option>
                                            <option value="automatic">Automatic</option>
                                            <option value="manual">Manual</option>
                                        </>
                                    )}
                                    {key === 'Owner' && (
                                        <>
                                            <option value="">Select Owner</option>
                                            <option value="1st">1st</option>
                                            <option value="2nd">2nd</option>
                                        </>
                                    )}
                                    {key === 'Seller_Type' && (
                                        <>
                                            <option value="">Select Seller Type</option>
                                            <option value="individual">Individual</option>
                                            <option value="dealership">Dealership</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        );
                    } else {
                        return (
                            <div key={key} className="form-group">
                                <label htmlFor={key}>{key.replace('_', ' ')}:</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={carDetails[key]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        );
                    }
                })}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
