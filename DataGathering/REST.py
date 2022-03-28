import requests
from laborb import *
from APIcalls import *

def Housing(year):
    cost = housing(year)
    response = requests.post('http://0.0.0.0:3000/v1/newMedianHousing', data = {'county': 'Spokane', 'state' : 'WA', 'med_housing_cost' : cost, 'year' : year})
    return response

def LaborForce(year):
    force, participation = labor(year)
    response = requests.post('http://0.0.0.0:3000/v1/newLabor', data = {'county': 'Spokane', 'state' : 'WA', 'year' : year, 'labor_force' : force, 'labor_rate' : participation})
    return response


def main():
    return Housing(2011)

if __name__ == "__main__":
    code = main()
    print(code)