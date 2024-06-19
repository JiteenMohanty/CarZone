import pandas as pd
import pickle

# Load your trained model
model = pickle.load(open('model.pkl', 'rb')) 

def preprocess_data(data):
    df = pd.DataFrame([data])

    # 1. Extract Company from Name
    df['Company'] = df['Name'].apply(lambda x: x.split()[0])

    # 2. Convert Categorical to Numerical
    company_map = {'Maruti': 1, 'Hyundai': 2, 'Honda': 3, 'Audi': 4, 'Nissan': 5, 'Toyota': 6,
                   'Volkswagen': 7, 'Tata': 8, 'Land': 9, 'Mitsubishi': 10, 'Renault': 11,
                   'Mercedes-Benz': 12, 'Bmw': 13, 'Mahindra': 14, 'Ford': 15, 'Porsche': 16, 
                   'Datsun': 17, 'Jaguar': 18, 'Volvo': 19, 'Chevrolet': 20, 'Skoda': 21, 
                   'Mini': 22, 'Fiat': 23, 'Jeep': 24, 'Ambassador': 25, 'Isuzu': 26, 
                   'Force': 27, 'Bentley': 28, 'Lamborghini': 29}
    fuel_map = {'Diesel': 1, 'Petrol': 2, 'CNG': 3, 'LPG': 4}
    transmission_map = {'Manual': 1, 'Automatic': 2}
    owner_map = {'First': 1, 'Second': 2, 'Third': 3, 'Fourth & Above': 4}

    df['Name'] = df['Company'].map(company_map).fillna(0)
    df['Fuel_Type'] = df['Fuel_Type'].map(fuel_map).fillna(0)
    df['Transmission'] = df['Transmission'].map(transmission_map).fillna(0)
    df['Owner_Type'] = df['Owner_Type'].map(owner_map).fillna(0)

    # 3. Convert to Correct Datatypes
    df['Kilometers_Driven'] = df['Kilometers_Driven'].astype(float)
    df['Mileage'] = df['Mileage'].astype(float)
    df['Engine'] = df['Engine'].astype(float)
    df['Power'] = df['Power'].astype(float)
    df['Seats'] = df['Seats'].astype(float)
    df['Year'] = df['Year'].astype(float)

    # 4. Dropping unnecessary column
    df.drop(columns=['Company'], inplace=True)

    return preprocess_data

def predict_price(preprocessed_data):
    prediction = model.predict(preprocessed_data)[0]
    return prediction
