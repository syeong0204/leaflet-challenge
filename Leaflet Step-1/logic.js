//Worked on this with Julianna and the amazing Gretel during Homework Hackathon.

// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map with our layers.
var map = L.map('map', {
  center: [34.78, -116.42],
  zoom: 10
});
// Add our “streetmap” tile layer to the map.
streetmap.addTo(map);


// When the layer control is added, insert a div with the class of “legend”.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(function (data) {
  function styleData(features) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: chooseColor(features.geometry.coordinates[2]),
      color: '#000000',
      radius: chooseRadius(features.properties.mag),
      stroke: true,
      weight: 0.3
    }
  }

  // Add the info legend to the map.
  L.geoJson(data, {

    style: styleData,
    pointToLayer: function (features, latlng) {
      return L.circleMarker(latlng)


    },

    onEachFeature: function (features, layer) {
      layer.bindPopup(
        "location: " + features.properties.place + '<br>'
        + 'magnitude: ' + features.properties.mag + '<br>'
        + 'depth: ' + features.geometry.coordinates[2]
      )
    }
  }).addTo(map);

  function chooseRadius(mag) {
    if (mag === 0) {
      return 1;
    }
    return (mag * 3)
  }


  function chooseColor(depth) {
    if (depth >= 90) return 'yellow';
    else if (depth >= 70) return 'red';
    else if (depth >= 50) return 'orange';
    else if (depth >= 30) return 'green';
    else if (depth >= 10) return 'purple';
    else if (depth >= -10) return 'lime'
  }

  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [-10, 10, 30, 50, 70, 90],
      labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };

  legend.addTo(map);
  // Initialize an object that contains icons for each layer group.

  /* var legend = L.control({ position: 'bottomright' });
 
   legend.onAdd = function (map) {
 
     var div = L.DomUtil.create('div', 'info legend'),
       grades = [-10, 10, 30, 50, 70, 90]
 
     for (var i = 0; i < grades.length; i++) {
       div.innerHTML +=
         '<i style = "background:' + chooseColor(grades[i] + 1) + '"></i" '
         + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
     }
     return div;
   };
 
   legend.addTo(map); 
 
    var icons = {
     EARTHQUAKES: L.ExtraMarkers.icon({
       icon: 'ion-settings',
       iconColor: 'white',
       markerColor: 'yellow',
       shape: 'star'
     })
 
     //TECTONIC: L.ExtraMarkers.icon({
     //icon: 'ion-android-bicycle',
     //iconColor: 'white',
     // markerColor: 'red',
     //shape: 'circle' */
})

