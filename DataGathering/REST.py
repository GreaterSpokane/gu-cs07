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

def Employment(year):
    employment, unemployment = LaborBuerau_Employment(year)
    response = requests.post()

def main():
    LaborForce(2018)

if __name__ == "__main__":
    code = main()
    print(code)