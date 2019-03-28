//sleep function to offset anachronocity 
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//first pause to allow time for data to be harvested
async function pause() {
  console.log('Wait for 30 seconds...');
  await sleep(15000);
  console.log(earthquakes[0].location[0]);
  console.log(earthquakes[0].magnitude);
}


// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4
});

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

var earthquakes = []

d3.json(url, function(response) {
  
  var feature = response.features
  
  function markerSize(magnitude) {
    return magnitude;
  }
    
    // Loop through data
  for (var i = 1; i < 5000; i++) {    
    var longitude = response.features[i].geometry.coordinates[0]
    var latitude = response.features[i].geometry.coordinates[1]
    var coordinates = [latitude,longitude]
      
    var magnitude = response.features[i].properties.mag
      // Set the data location property to a variable
    earthquakes.push(
      {
        location: [coordinates],
        magnitude: magnitude
        }
    );
    };    
  });    

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population

pause();
pause_again();
//pauses longer than the first pause in order to make sure all data points are captured
async function pause_again() {
  var colors = ["lime","greenyellow","yellow","orange","darkorange","red"]
  function color(){
  if (earthquakes[i].magnitude<=1) {
    return colors[0]
  }
  else if(earthquakes[i].magnitude>1 && earthquakes[i].magnitude<=2){
    return colors[1]
  }
  else if(earthquakes[i].magnitude>2 && earthquakes[i].magnitude<=3){
    return colors[2]
  }
  else if(earthquakes[i].magnitude>3 && earthquakes[i].magnitude<=4){
    return colors[3]
  }
  else if(earthquakes[i].magnitude>4 && earthquakes[i].magnitude<=5){
    return colors[4]
  }
  else {
    return colors[5]
  }
}
  console.log('Processing data...');
  await sleep(15001);
  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < earthquakes.length; i++) {
  L.circle(earthquakes[i].location[0], {
    fillOpacity: 0.75,
    color: "black",
    stroke: false,
    fillColor: color(),
    radius: earthquakes[i].magnitude*50000
  }).addTo(myMap);
}
}

