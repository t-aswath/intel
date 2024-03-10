<div align=center>
<img src="https://www.intel.com/content/dam/develop/public/us/en/images/logos/logo-oneapi-rwd.png" width=200>
<img src="https://github.com/t-aswath/mdeditor/assets/119417646/3f2def29-79c2-42e9-9e6b-f7167d1b99ff" width=100>
<h1>DAKSH INTEL ONE API HACKATHON 2024</h1> 
<img src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&color=black">
<img src="https://img.shields.io/badge/:bitspace-%23121011?style=for-the-badge&logoColor=%23ffffff&color=%23000000">
<img src="https://img.shields.io/badge/intel-%23121011?style=for-the-badge&color=blue">
<img src="https://img.shields.io/badge/daksh-%23121011?style=for-the-badge&logoColor=%23ffffff&color=%23000000">
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&color=black">
</div>

# CIMTA - MODEL 1
#Overview
CIMTA is a binary classification model designed to predict whether a patient can make an appointment based on various features. The model is implemented using TensorFlow's sequential model and aims to provide insights into the likelihood of a patient attending a scheduled appointment.

# Features
- num_patients: The number of patients.
- avg_wait_time: The average wait time.
- time_to_hospital: Time required to reach the hospital.
- doc_rating: Rating of the doctor.
# Dataset
The dataset used for training, validation, and testing the model is provided in the data.csv file. Ensure that the data is preprocessed and cleaned before training the model.

# Model Architecture
The model architecture consists of a feedforward neural network with two hidden layers. The hyperparameters, such as the number of nodes, dropout probability, learning rate, and batch size, are tuned to optimize performance.

# Data Exploration
Before training the model, it's crucial to explore the dataset. Visualizations are provided to illustrate the distribution of each feature and the impact on the target class.

# Data Preprocessing
The dataset is preprocessed by handling missing values and splitting it into training, validation, and test sets. To address class imbalance, Random Oversampling is applied during the scaling process.

# Model Training
The model is trained using the training set, and hyperparameters are tuned to find the optimal configuration. Training history, including loss and accuracy, is visualized to assess model performance.

# Best Model Selection
The model with the lowest validation loss is selected as the best model for making predictions on new data.

# Usage
To use the CIMTA model:

Ensure the necessary packages are installed using `pip install -r requirements.txt`.
Prepare your dataset and save it as `data.csv`.
Run the model training script: `python train_model.py`.
Evaluate the model on new data using the provided best model.
# Requirements
- TensorFlow
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Imbalanced-Learn

# ITAS - Inpatient Traffic Analysis System
# Overview
ITAS (Inpatient Traffic Analysis System) is an ARIMA (AutoRegressive Integrated Moving Average) model designed to predict the future count of patients based on historical data. The model analyzes trends in the patient count to provide insights into the expected traffic of inpatients for a given time period.

# Features
The model utilizes a single feature, "Crowd," representing the daily count of inpatients.

# Dataset Generation
To demonstrate the model, a synthetic dataset is generated, simulating the daily count of inpatients from January 1, 2023, to January 1, 2024. The dataset is saved as itas.csv.

# Dataset Visualization
The generated dataset is visualized using line plots to showcase the trends in the inpatient count over time.

# Model Training
The ARIMA model is trained using the generated dataset with an order of (5,1,0). The model summary provides information about the coefficients, significance, and other statistical metrics.

# Residual Analysis
Residual analysis is conducted to assess the model's performance. Line plots and density plots of residuals, along with summary statistics, help in evaluating the quality of predictions.

# Forecasting
The model is capable of making predictions for future time points. In the example provided, the model forecasts the inpatient count for the next time point.

# Model Persistence
Once trained, the ARIMA model is saved as `model.pkl` for future use. This allows for reusing the trained model without the need for retraining.

# Usage
To use the ITAS model:

Ensure the necessary packages are installed using `pip install -r requirements.txt`.
Use the provided dataset or replace it with your own by updating `itas.csv`.
Run the ITAS model script: `python itas_model.py`.
Analyze the generated visualizations, model summary, and predictions.
# Requirements
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Statsmodels
- Scikit-Learn
