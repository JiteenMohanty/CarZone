from flask import Flask, request, jsonify
from backend.car_price_model import preprocess_data, predict_price
from flask_cors import CORS  

app = Flask(__name__)
CORS(app) 

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Check if all required fields are present in the request data
        required_fields = ['Name', 'Year', 'Kilometers_Driven', 'Fuel_Type', 'Transmission', 'Owner_Type', 'Mileage', 'Engine', 'Power', 'Seats']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

        # Preprocess the data
        preprocessed_data = preprocess_data(data)

        # Make a prediction
        prediction = predict_price(preprocessed_data)
        
        # Ensure the prediction is within a reasonable range
        if prediction < 0:
            return jsonify({'error': 'Invalid prediction. Please check your input values.'}), 500

        # Return the prediction
        return jsonify({'price': prediction})
    except Exception as e:
        # Handle any potential errors during the prediction process
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 
