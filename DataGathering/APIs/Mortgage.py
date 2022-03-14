import pandas as pd
import numpy

df = pd.read_csv('Mort30-90.csv', index_col='Name')
df2 = pd.read_csv('Mort90+.csv', index_col='Name')

deliquency = df['2021-06'].values[456]
deliquency2 = df2['2021-06'].values[456]
total = deliquency + deliquency2

print(total)



