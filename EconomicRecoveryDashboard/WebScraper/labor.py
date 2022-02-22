import pandas as pd
import censusdata
from tabulate import tabulate
import requests


data = censusdata.download('acs1', 2019, censusdata.censusgeo([('state', '53'), ('county', '063')]), ['B23025_001E', 'B23025_002E'])

column_names = ['Civilian Population', 'Civilians In Labor Force']
data.columns = column_names

data2 = censusdata.download('acs1', 2019, censusdata.censusgeo([('state', '16'), ('county', '055')]), ['B23025_001E', 'B23025_002E'])

column_names = ['Civilian Population', 'Civilians In Labor Force']
data2.columns = column_names

data['Laborforce Participation Rate'] = data.apply(
 lambda row:  row['Civilians In Labor Force']/row['Civilian Population'], 
   axis = 1)
data2['Laborforce Participation Rate'] = data2.apply(
 lambda row:  row['Civilians In Labor Force']/row['Civilian Population'], 
   axis = 1)

df = pd.concat([data, data2], ignore_index = True, axis = 0)

indexes = ['Spokane County, WA', 'Kootenai County, ID']
df.index = indexes

df['Year'] = '2019'

print(tabulate(df, headers='keys', tablefmt='psql'))

json = df.to_json()
print(json)
