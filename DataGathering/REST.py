import requests
import sys
from laborb import *
from APIcalls import *

def Housing(countyVal, yearVal, stateVal):
    cost = housing(countyVal, yearVal)
    response = requests.post(f'https://spokaneeconomicdashboard.herokuapp.com/v1/newMedianHousing?county={countyVal}&state={stateVal}&year={yearVal}&med_housing_cost={cost}')
    return response

def LaborForce(countyVal, yearVal, stateVal):
    force, participation = labor(countyVal, yearVal)
    response = requests.post(f'https://spokaneeconomicdashboard.herokuapp.com/v1/newLaborForce?county={countyVal}&state={stateVal}&year={yearVal}&labor_force={force}')
    response2 = requests.post(f'https://spokaneeconomicdashboard.herokuapp.com/v1/newLaborParticipation?county={countyVal}&state={stateVal}&year={yearVal}&labor_participation={participation}')
    return response

def Rent(countyVal, yearVal, stateVal):
    average_rent = housing_month(countyVal, yearVal)
    response = requests.post(f'https://spokaneeconomicdashboard.herokuapp.com/v1/newAverageRent?county={countyVal}&state={stateVal}&year={yearVal}&average_rent={average_rent}')
    return response

def Income(countyVal, yearVal, stateVal):
    median_income = MedianIncome(countyVal, yearVal)
    response = requests.post(f'https://spokaneeconomicdashboard.herokuapp.com/v1/newMedianIncome?county={countyVal}&state={stateVal}&year={yearVal}&median_income={median_income}')
    return response

def Education(countyVal, yearVal, stateVal):
    rate = education(countyVal, yearVal)
    response = requests.post(f'https://spokaneeconomicdashboard.herokuapp.com/v1/newHighSchoolGraduates?county={countyVal}&state={stateVal}&year={yearVal}&high_school_graduates={rate}')
    return response

def Employment(countyVal, yearVal, stateVal):
    newEmployment, unemployment = laborBuerau_Employment(countyVal, yearVal)
    response = requests.post(f'https://spokaneeconomicdashboard.herokuapp.com/v1/newEmployed?county={countyVal}&state={stateVal}&year={yearVal}&employed={newEmployment}')
    response2 = requests.post(f'https://spokaneeconomicdashboard.herokuapp.com/v1/newUnemployed?county={countyVal}&state={stateVal}&year={yearVal}&unemployed={unemployment}')
    return response

def main():
    LaborForce('Spokane', sys.argv[1], 'WA')
    LaborForce('Boise', sys.argv[1], 'ID')
    LaborForce('Fort Collins', sys.argv[1], 'CO')
    LaborForce('Eugene', sys.argv[1], 'OR')
    LaborForce('Salt Lake City', sys.argv[1], 'UT')
    Housing('Spokane', sys.argv[1], 'WA')
    Housing('Boise', sys.argv[1], 'ID')
    Housing('Fort Collins', sys.argv[1], 'CO')
    Housing('Eugene', sys.argv[1], 'OR')
    Housing('Salt Lake City', sys.argv[1], 'UT')
    Rent('Spokane', sys.argv[1], 'WA')
    Rent('Boise', sys.argv[1], 'ID')
    Rent('Fort Collins', sys.argv[1], 'CO')
    Rent('Eugene', sys.argv[1], 'OR')
    Rent('Salt Lake City', sys.argv[1], 'UT')
    Income('Spokane', sys.argv[1], 'WA')
    Income('Boise', sys.argv[1], 'ID')
    Income('Fort Collins', sys.argv[1], 'CO')
    Income('Eugene', sys.argv[1], 'OR')
    Income('Salt Lake City', sys.argv[1], 'UT')
    Education('Spokane', sys.argv[1], 'WA')
    Education('Boise', sys.argv[1], 'ID')
    Education('Fort Collins', sys.argv[1], 'CO')
    Education('Eugene', sys.argv[1], 'OR')
    Education('Salt Lake City', sys.argv[1], 'UT')
    Employment('Spokane', sys.argv[1], 'WA')
    Employment('Boise', sys.argv[1], 'ID')
    Employment('Fort Collins', sys.argv[1], 'CO')
    Employment('Eugene', sys.argv[1], 'OR')
    Employment('Salt Lake City', sys.argv[1], 'UT')

if __name__ == "__main__":
    code = main()
    print(code)