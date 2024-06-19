import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BuyCarPage.scss';
import CarCard from './CarCard';

function BuyCarPage({ user }) {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [carDetails, setCarDetails] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    brand: '',
    model: '',
    year: '',
    fuelType: '',
    bodyType: '',
    transmission: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [popularBrands] = useState([
    'Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Kia', 'Toyota',
    // ... Add more popular brands here
  ]);

  useEffect(() => {
    if (carId) {
      fetchCarDetails(carId);
    } else {
      fetchCars();
    }
  }, [carId]); 

  const fetchCars = () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(filters).toString();
    fetch(`/api/cars?${queryParams}`) 
      .then(response => response.json())
      .then(data => {
        setCars(data);
        setError(null); 
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  };

  const fetchCarDetails = (carId) => {
    setIsLoading(true);
    fetch(`/api/cars/${carId}`)
      .then(response => response.json())
      .then(data => {
        setCarDetails(data);
        setError(null);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  };

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (!carId) {
      fetchCars();
    }
  };

  const handleBrandChange = (brand) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      brand: prevFilters.brand === brand ? '' : brand, 
    }));
    fetchCars();
  };

  const handlePurchase = () => {
    // ... your purchase logic ...
    navigate(`/checkout/${carId}`); 
  };

  return (
    <div className={`buy-car-page ${carId ? 'single-car-view' : ''}`}>
      <div className="filters">
        {/* Budget Filter */}
        <div className="filter-section">
          <h2>Budget</h2>
          <div className="price-range-filter">
            <label htmlFor="minPrice">From:</label>
            <input type="number" id="minPrice" name="minPrice" value={filters.minPrice || ''} onChange={handleFilterChange} />
            <label htmlFor="maxPrice">To:</label>
            <input type="number" id="maxPrice" name="maxPrice" value={filters.maxPrice || ''} onChange={handleFilterChange} />
          </div>
          <div className="budget-options">
            {/* Sample price range options */}
            {['Under ₹2 Lakh', '₹2 - ₹3 Lakh', '₹3 - ₹5 Lakh', '₹5 - ₹8 Lakh', '₹8 - ₹10 Lakh', 'Above ₹10 Lakh'].map(range => (
              <label key={range}>
                <input 
                  type="checkbox" 
                  value={range} 
                  checked={filters.budget === range} 
                  onChange={handleFilterChange}
                />
                {range}
              </label>
            ))}
          </div>
        </div>

        {/* Brand + Model Filter */}
        <div className="filter-section">
          <h2>Brand + Model</h2>
          <div className="search-bar">
            <input type="text" placeholder="Search Brand or Model" value={filters.brand || filters.model} onChange={(e) => {
              setFilters({ ...filters, brand: e.target.value, model: e.target.value }); 
            }}/>
          </div>
          <div className="brand-options">
            {popularBrands.map(brand => (
              <label key={brand}>
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand} 
                  onChange={() => handleBrandChange(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Other Filters (Year, Fuel Type, etc.) */}
        {/* ... Add your other filter sections here ... */}
      </div>

      <div className="car-list">
        {isLoading ? (
          <p>Loading cars...</p>
        ) : error ? (
          <p>Error fetching cars: {error.message}</p>
        ) : cars.length > 0 ? (
          cars.map(car => (
            <CarCard key={car.id} car={car} onPurchase={handlePurchase} /> // Pass handlePurchase
          ))
        ) : carDetails ? (
          // Render single car view 
          <div>
            <h2>{carDetails.name}</h2>
            {/* ... display other car details (price, description, etc.) */}
            {/* Pass the carDetails to the onPurchase function */}
            <button onClick={() => handlePurchase(carDetails)}>Buy Now</button> 
          </div>
        ) : (
          <p>No cars match your filters.</p>
        )}
      </div>
    </div>
  );
}

export default BuyCarPage;
