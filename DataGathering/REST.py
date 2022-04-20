import requests
from laborb import *
from APIcalls import *

def Housing(countyVal, yearVal, stateVal):
    cost = housing(countyVal, yearVal)
    response = requests.post(f'http://0.0.0.0:3000/v1/newMedianHousing?county={countyVal}&state={stateVal}&year={yearVal}&med_housing_cost={cost}')
    return response

def LaborForce(countyVal, yearVal, stateVal):
    force, participation = labor(countyVal, yearVal)
    response = requests.post(f'http://0.0.0.0:3000/v1/newLaborForce?county={countyVal}&state={stateVal}&year={yearVal}&labor_force={force}')
    response2 = requests.post(f'http://0.0.0.0:3000/v1/newLaborParticipation?county={countyVal}&state={stateVal}&year={yearVal}&labor_participation={participation}')
    return response

def Rent(countyVal, yearVal, stateVal):
    average_rent = housing_month(countyVal, year)
    response = requests.post(f'http://0.0.0.0:3000/v1/newAverageRent?county={countyVal}&state={stateVal}&year={yearVal}&average_rent={average_rent}')

def Income(year):
    median_income = MedianIncome(year)
    response = requests.post(f'http://0.0.0.0:3000/v1/newAverageRent?county={countyVal}&state={stateVal}&year={yearVal}&average_rent={average_rent}')

def Employment(countyVal, yearVal, stateVal):
    newEmployment, unemployment = employment(countyVal, yearVal)
    response = requests.post(f'http://0.0.0.0:3000/v1/newEmployed?county={countyVal}&state={stateVal}&year={yearVal}&employed={newEmployment}')
    response2 = requests.post(f'http://0.0.0.0:3000/v1/newUnemployed?county={countyVal}&state={stateVal}&year={yearVal}&unemployed={unemployment}')
    return response

def main():
    LaborForce('Boise', 2017, 'ID')

if __name__ == "__main__":
    code = main()
    print(code)