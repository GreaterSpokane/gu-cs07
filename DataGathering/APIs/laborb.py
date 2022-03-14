import requests
import json
import prettytable

year = input("Enter year to fetch: ")
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
data_set = {"indicator" : "Employment", "source" : "Bureau of Labor Statistics", "year" : year, "value" : val}
print(data_set)
