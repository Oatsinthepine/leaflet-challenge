# data extraction from remote api:

'''The reason for this file is to save a copy of the past-day earthquake geoJson data locally for secure access'''

import requests
import json

url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

print(requests.get(url)) #if 200 is ok

# reterieving data and converting it into JSON format:
earthquake_data = requests.get(url).json()
#print(earthquake_data)


# use file handel to save the reterived data into my local file, for later usage.
with open('earthquake_data.geojson', 'w') as file:
    json.dump(earthquake_data, file, indent=2) # write out data to file in json format.

print("GeoJSON data saved to earthquake_data.geojson")