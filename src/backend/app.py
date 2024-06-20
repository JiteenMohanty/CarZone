import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the ML model
model = pickle.load(open('final.pkl', 'rb'))

# Define the expected order of features based on the model training
expected_features = ['Year', 'Kilometers_Driven', 'Fuel_Type', 'Transmission', 'Owner_Type', 'Mileage', 'Engine', 'Power', 'Seats', 'Company']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Check if data is present
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Log received data for debugging
        app.logger.info(f"Received data: {data}")

        # Input validation
        for field in expected_features:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

            # Check if values are non-empty and numeric where expected
            if not data[field] or (field != 'Company' and not isinstance(data[field], (int, float))):
                return jsonify({'error': f'Invalid or empty value for field: {field}'}), 400

        # Create NumPy array with correct feature order
        input_data = np.array([[
            data['Year'],
            data['Kilometers_Driven'],
            data['Fuel_Type'],
            data['Transmission'],
            data['Owner_Type'],
            data['Mileage'],
            data['Engine'],
            data['Power'],
            data['Seats'],
            data['Company']
        ]])

        # Log input data for debugging
        app.logger.info(f"Input data array: {input_data}")

        # Make prediction
        prediction = model.predict(input_data)[0]

        # Return the prediction
        return jsonify({'price': prediction})

    except ValueError as e:
        app.logger.error(f"ValueError: {e}")
        return jsonify({'error': 'Invalid data types in input. Please check your input values.'}), 400

    except KeyError as e:
        app.logger.error(f"KeyError: {e}")
        return jsonify({'error': f'Missing field in input data: {e}'}), 400  # Include the missing field name
    
    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({'error': 'An error occurred while processing your request'}), 500

if __name__ == '__main__':
    app.run(debug=True)
