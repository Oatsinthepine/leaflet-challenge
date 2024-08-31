var myMap = L.map('map', {
    center: [38.7946, 106.5348],
    zoom: 3,
    // dragging: false
});

let baseMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

baseMap.addTo(myMap);


let link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Function to calculate the marker size based on its magnitude
function makeMarkerSize(magnitude) {
    return magnitude * 50000; // Adjust this multiplier as needed
}

// Function to determine the color based on depth
function changeColor(depth) {
    if (depth >= 90) {
        return '#4B0082'; // Dark purple
    } else if (depth >= 70) {
        return '#8A2BE2'; // BlueViolet
    } else if (depth >= 50) {
        return '#9400D3'; // DarkViolet
    } else if (depth >= 30) {
        return '#BA55D3'; // MediumOrchid
    } else if (depth >= 10) {
        return '#FF8C00'; // DarkOrange
    } else {
        return '#F4A460'; // SandyBrown (Light brown)
    }
};

// Load the GeoJSON data using d3.json()
d3.json(link).then(function (data) {
    // Access the features array from the GeoJSON data
    let features = data.features;

    // Loop through each feature in the features array
    for (let i = 0; i < features.length; i++) {
        // Extract the latitude, longitude, and depth from the coordinates
        let lat = features[i].geometry.coordinates[1];
        let lng = features[i].geometry.coordinates[0];
        let depth = features[i].geometry.coordinates[2];

        // Create a circle marker for each feature
        L.circle([lat, lng], {
            stroke: true,
            opacity: 1,
            fillOpacity: 1,
            color: "black",
            fillColor: changeColor(depth),
            radius: makeMarkerSize(features[i].properties.mag)
        // here use .bindPopup to provide additional information when user clicked the marker.
        }).bindPopup(`<h3>${features[i].properties.title}</h3><hr><p>Depth: ${depth}</p>`).addTo(myMap);
    }

    // Create a legend control and add it to the map
    let legend = L.control({ position: 'bottomright' });

    // add the legend to the baseMap
    legend.onAdd = function () {
        let div = L.DomUtil.create('div', 'info legend');
        let depths = [-10, 10, 30, 50, 70, 90]; // Depth intervals for presenting.

        // Loop through the intervals and generate a label with a colored square for each interval
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + changeColor(depths[i] + 1) + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }

        return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);

}).catch(function (error) {
    console.error('Error loading the GeoJSON data:', error); // perform error handelling if unable to fetch and process json data.
});