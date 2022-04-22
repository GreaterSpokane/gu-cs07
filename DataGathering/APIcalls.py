import pandas as pd
import censusdata
from tabulate import tabulate
import requests
import sys
import prettytable
from flask import Flask, request
import json

##Fetches median income in spokane county in 2019

def MedianIncome(county, year):
    countyDict = {'Spokane': '063', 'Boise': '001', 'Fort Collins': '069', 'Eugene': '039', 'Salt Lake': '035'}
    stateDict = {'Spokane': '53', 'Boise': '16', 'Fort Collins': '08', 'Eugene': '41', 'Salt Lake': '49'}
    data = censusdata.download('acs1', int(year), censusdata.censusgeo([('state', stateDict[county]), ('county', countyDict[county])]), ['B19013_001E'])

    return data.iat[0,0]

##Housing Index API
def housing_month(county, year):
    countyDict = {'Spokane': '063', 'Boise': '001', 'Fort Collins': '069', 'Eugene': '039', 'Salt Lake': '035'}
    stateDict = {'Spokane': '53', 'Boise': '16', 'Fort Collins': '08', 'Eugene': '41', 'Salt Lake': '49'}
    data = censusdata.download('acs1', int(year), censusdata.censusgeo([('state', stateDict[county]), ('county', countyDict[county])]), ['B25105_001E'])

    return data.iat[0,0]

def housing(county, year):
    countyDict = {'Spokane': '063', 'Boise': '001', 'Fort Collins': '069', 'Eugene': '039', 'Salt Lake': '035'}
    stateDict = {'Spokane': '53', 'Boise': '16', 'Fort Collins': '08', 'Eugene': '41', 'Salt Lake': '49'}
    data = censusdata.download('acs1', int(year), censusdata.censusgeo([('state', stateDict[county]), ('county', countyDict[county])]), ['B25077_001E'])

    return data.iat[0,0]

##LaborForce Participation
def labor(county, year):
    countyDict = {'Spokane': '063', 'Boise': '001', 'Fort Collins': '069', 'Eugene': '039', 'Salt Lake': '035'}
    stateDict = {'Spokane': '53', 'Boise': '16', 'Fort Collins': '08', 'Eugene': '41', 'Salt Lake': '49'}
    data = censusdata.download('acs1', int(year), censusdata.censusgeo([('state', stateDict[county]), ('county', countyDict[county])]), ['B23025_001E', 'B23025_002E'])

    column_names = ['Civilian Population', 'Civilians In Labor Force']
    data.columns = column_names

    data['Laborforce Participation Rate'] = data.apply(
    lambda row:  row['Civilians In Labor Force']/row['Civilian Population'], 
        axis = 1)

    return data.iat[0,1], data.iat[0,2]


#laborbuerau data
def laborBuerau_Employment(year):
    headers = {'Content-type': 'application/json'}
    employment = json.dumps({"seriesid": ['LAUMT534406000000005'],"startyear":year, "endyear":year})
    unemployment = json.dumps({"seriesid": ['LAUCN530630000000004'],"startyear":year, "endyear":year})
    employment_data = requests.post('https://api.bls.gov/publicAPI/v2/timeseries/data/', data=employment, headers=headers)
    unemployment_data = requests.post('https://api.bls.gov/publicAPI/v2/timeseries/data/', data=unemployment, headers=headers)
    employment_json_data = json.loads(employment_data.text)
    unemployment_json_data = json.loads(unemployment_data.text)
    unemployment_total = 0
    employment_total = 0

    for series in unemployment_json_data['Results']['series']:
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
                unemployment_total = unemployment_total + int(value)
                x.add_row([seriesId,year,period,value,footnotes[0:-1]])

    for series in employment_json_data['Results']['series']:
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
                employment_total = employment_total + int(value)
                x.add_row([seriesId,year,period,value,footnotes[0:-1]])

    val2 = math.floor(unemployment_total/12)
    val1 = math.floor(employment_total/12)

    return val1, val2