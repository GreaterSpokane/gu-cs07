import requests
from laborb import *
from APIcalls import *

def main():
    cost = housing(2018)
    response = requests.post('http://0.0.0.0:3000/v1/newMedianHousing', data = {'county': 'Spokane', 'state' : 'WA', 'year' : '2018', 'med_housing_cost' : cost})
    return response

if __name__ == "__main__":
    code = main()
    print(code)