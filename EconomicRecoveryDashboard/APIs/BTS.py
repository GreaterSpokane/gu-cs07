import pandas as pd
from sodapy import Socrata

client = Socrata("data.bts.gov",
                 "qc3HQTzDR5BvSqfu7qEKyRlVB",
                 username="labeln@zagmail.gonzaga.edu",
                 password="")

# First 2000 results, returned as JSON from API / converted to Python list of
# dictionaries by sodapy.
results = client.get("https://data.bts.gov/resource/crem-w557.json?system_use_u_s_airline=2870000.0")

# Convert to pandas DataFrame
results_df = pd.DataFrame.from_records(results)
print(results_df)