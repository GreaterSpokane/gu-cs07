import requests
import json
import prettytable
import math

def employment(year):
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


if __name__ == "__main__":
    year = input("Enter year to fetch: ")
    val1, val2 = employment(year)
    print(val1)
    print(val2)
    employment_data_set = {"indicator" : "Employment", "source" : "Bureau of Labor Statistics", "year" : year, "value" : val1}
    unemployment_data_set = {"indicator" : "Employment", "source" : "Bureau of Labor Statistics", "year" : year, "value" : val2}
    print(employment_data_set)
    print(unemployment_data_set)

