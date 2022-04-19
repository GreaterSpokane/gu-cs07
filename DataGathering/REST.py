import requests
from laborb import *
from APIcalls import *

def Housing(year):
    cost = housing(year)
    response = requests.post('http://0.0.0.0:3000/v1/newMedianHousing', data = {'county': 'Spokane', 'state' : 'WA', 'year' : year, 'med_housing_cost' : cost})
    return response

def LaborForce(year):
    force, participation = labor(year)
    response = requests.post('http://0.0.0.0:3000/v1/newLaborForce', data = {'county': 'Spokane', 'state' : 'WA', 'year' : year, 'labor_force' : force})
    return response

def Rent(year):
    average_rent = housing_month(year)
    response = requests.post()

def Income(year):
    median_income = MedianIncome(year)
    response = requests.post()

def Employment(countyVal, yearVal, stateVal):
    newEmployment, unemployment = employment(countyVal, yearVal)
    response = requests.post(f'http://0.0.0.0:3000/v1/newEmployed?county={countyVal}&state={stateVal}&year={yearVal}&employed={newEmployment}')
    response2 = requests.post(f'http://0.0.0.0:3000/v1/newUnemployed?county={countyVal}&state={stateVal}&year={yearVal}&unemployed={unemployment}')
    return response

def main():
    Employment('Spokane', 2017, 'WA')

if __name__ == "__main__":
    code = main()
    print(code)