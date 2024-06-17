import pickle
from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))  # Make sure 'model.pkl' is in the same directory

def preprocess_data(data):
    df = pd.DataFrame([data])

    # 1. Extract Company from Name (If your model doesn't directly use 'Name')
    df['Company'] = df['Name'].apply(lambda x: x.split()[0].title())

    # 2. Map Categorical Features to Numerical (If your model requires it)
    company_map = {
        'Maruti': 1, 'Hyundai': 2, 'Honda': 3, 'Audi': 4, 'Nissan': 5, 'Toyota': 6,
        'Volkswagen': 7, 'Tata': 8, 'Land': 9, 'Mitsubishi': 10, 'Renault': 11,
        'Mercedes-benz': 12, 'Bmw': 13, 'Mahindra': 14, 'Ford': 15, 'Porsche': 16, 
        'Datsun': 17, 'Jaguar': 18, 'Volvo': 19, 'Chevrolet': 20, 'Skoda': 21, 
        'Mini': 22, 'Fiat': 23, 'Jeep': 24, 'Ambassador': 25, 'Isuzu': 26, 
        'Force': 27, 'Bentley': 28, 'Lamborghini': 29
    }  
    fuel_map = {'Diesel': 1, 'Petrol': 2, 'CNG': 3, 'LPG': 4}
    transmission_map = {'Manual': 1, 'Automatic': 2}
    owner_map = {'First': 1, 'Second': 2, 'Third': 3, 'Fourth & Above': 4}

    df['Name'] = df['Company'].map(company_map)  # Replace 'Name' with the mapped company value
    df['Fuel_Type'] = df['Fuel_Type'].map(fuel_map)
    df['Transmission'] = df['Transmission'].map(transmission_map)
    df['Owner_Type'] = df['Owner_Type'].map(owner_map)

    # 3. Convert Numerical Features to Correct Types (If they're not already floats)
    df['Kilometers_Driven'] = df['Kilometers_Driven'].astype(float)
    df['Mileage'] = df['Mileage'].astype(float)
    df['Engine'] = df['Engine'].astype(float)
    df['Power'] = df['Power'].astype(float)
    df['Seats'] = df['Seats'].astype(float)

    # 4. Drop Company Column (if you replaced 'Name' with the mapped company value)
    df.drop(['Company'], axis=1, inplace=True)

    return df

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        # Preprocess the data
        input_data = preprocess_data(data)

        # Make a prediction
        prediction = model.predict(input_data)[0]

        # Return the prediction
        return jsonify({'price': prediction})
    except Exception as e:
        # Handle any potential errors and return an error message
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True) 
