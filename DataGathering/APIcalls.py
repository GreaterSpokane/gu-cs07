import pandas as pd
import censusdata
from tabulate import tabulate
import requests
import sys
import prettytable
from flask import Flask, request
import json

##Fetches median income in spokane county in 2019

def MedianIncome(year):
    data = censusdata.download('acs1', int(year), censusdata.censusgeo([('state', '53'), ('county', '063')]), ['B19013_001E'])

    print(data.iat[0,0])

##Housing Index API
def housing(year):
    data = censusdata.download('acs1', int(year), censusdata.censusgeo([('state', '53'), ('county', '063')]), ['B25105_001E'])

    print(data.iat[0,0])

##LaborForce Participation
def labor(year):
    data = censusdata.download('acs1', int(year), censusdata.censusgeo([('state', '53'), ('county', '063')]), ['B23025_001E', 'B23025_002E'])

    column_names = ['Civilian Population', 'Civilians In Labor Force']
    data.columns = column_names

    data['Laborforce Participation Rate'] = data.apply(
    lambda row:  row['Civilians In Labor Force']/row['Civilian Population'], 
        axis = 1)

    print([data.iat[0,1], data.iat[0,2]);


#laborbuerau data
def laborBuerau(year, indicator):
    headers = {'Content-type': 'application/json'}
    data = json.dumps({"seriesid": ['LAUMT534406000000005'],"startyear":year, "endyear":year})
    p = requests.post('https://api.bls.gov/publicAPI/v2/timeseries/data/', data=data, headers=headers)
    json_data = json.loads(p.text)
    total = 0
    for series in json_data['Results']['series']:
        x=prettytable.PrettyTable(["series id","year","period","value","footnotes"])
        seriesId = series['seriesID']
        for item in series['data']:
            year = item['year']
            period = item['period']
            value = item['value']
            footnotes=""
            for footnote in item['footnotes']:
                if footnote:
                    footnotes = footnotes + footnote['text'] + ','
            if 'M01' <= period <= 'M12':
                total = total + int(value)
                x.add_row([seriesId,year,period,value,footnotes[0:-1]])

    print(total/12)
    val = total/12
    data_set = {"Indicator" : "Employment", "source" : "Bureau of Labor Statistics", "year" : year, "value" : val}
    print(data_set)

if sys.argv[1] == 'MedianIncome': MedianIncome(sys.argv[2])
elif sys.argv[1] == 'Housing': housing(sys.argv[2])
elif sys.argv[1] == 'LaborForce': labor(sys.argv[2])


sys.stdout.flush()
