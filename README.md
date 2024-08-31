# leaflet-challenge
This repo is for week 15 leaflet challenge.

For this challenge, I only completed the mandatory part 1: Create the Earthquake visualisation, as required.
The optional part 2 is not included in my repo.

I first wrote a python script to fetch the geoJson data and saved it locally for reference. I used the USG.gov past week's (7 days) earthquake data for this challenge. url link is within the JS script and the saved geoJson file.

Then, I wrote the Js script in the logic.js file, using leaflet to create base map, and D3.json to process the geoJson data from the url. I use loop to process the marker creation (circle shape) for each corrdinate. I created two seperate function to adjust the marker's size based on its magnitude, and change circle color. After this legend is added using leaflet supported methods that coorespond with the markers color scale.

# References:

leaflet GeoJson documents: https://leafletjs.com/examples/geojson/

leaflet quickstart guide: https://leafletjs.com/examples/quick-start/


