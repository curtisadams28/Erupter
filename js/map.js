$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideDown("slow");
  });
});


let data;
let yearquery1 = 1800;
let yearquery2 = 1820;
let query = [];
const key = 'pk.eyJ1IjoiY3VydHV4ZGVsdXhlIiwiYSI6ImNqd2s0MmZpZTBjajQ0OG9lZjQ1cWswbzIifQ.qqwt65rirh2anE7ykAn2hw'

let myMap;
let canvas;
const mappa = new Mappa('MapboxGL', key);

const options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  studio: true, // false to use non studio styles
  //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
  style: 'mapbox://styles/mapbox/light-v9',
  compact: true,
}


function preload() {
  data = loadJSON('data/eruption_data.json');
}
function setup() {

  // Creates the canvas and overlays it on the map
  canvas = createCanvas(windowWidth,windowHeight - 30);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  fill('#E6B199');
  stroke('#505050');
  myMap.onChange(drawPoint);

  cursor(ARROW);

}

function draw() {

}

// Checks to see if the mouse is clicked on the recorded position of a volcano.
function mouseClicked() {
  var clickedvol = [];
  var max = {Year: 0};
  for (var i = 0; i < query.length; i++) {
    var volcano = myMap.latLngToPixel(query[i].Latitude, query[i].Longitude);
    var normvei = norm(query[i].VEI, 0, 8);
    var circlesize = normvei * 50;
    var distance = dist(mouseX, mouseY, volcano.x, volcano.y);
    if (distance <= circlesize) {
      //console.log(query[i]);
      clickedvol.push(query[i]);
    }
  }

  /*
  If there are more than 1 volcano that is clicked on, this will retrieve the
  last volcano with the highest year. That is the volcano that will always be
  on the top.
  */

  for (var i = 0; i < clickedvol.length; i++) {
    if (clickedvol[i].Year >= max.Year) {
      max = clickedvol[i];
    }
  }
  if (max.Year == 0) {
    max = null;
  }
  else {
    currentView(max);
  }


}

// Draws the circles onto the canvas using data from the jsonToArray() method.
function drawPoint(){
  clear();
  jsonToArray();
  //console.log(query);
  for (var i = 0; i < query.length; i++) {
    var volcano = myMap.latLngToPixel(query[i].Latitude, query[i].Longitude);
    var normvei = norm(query[i].VEI, 0, 8);
    var circlesize = normvei * 50;
    ellipse(volcano.x, volcano.y, circlesize, circlesize);
  }

}

// Takes the data from the JSON file and pushes it to query[] based on the year.
function jsonToArray() {
  query = [];

  for (var i = 0; i < data.eruptions.length; i++) {
    if (data.eruptions[i].Year >= yearquery1 && data.eruptions[i].Year <= yearquery2) {
      //console.log(data.eruptions[i]);
      query.push(data.eruptions[i]);
    }
  }
}

// Function to set top info section to the values of the selected volcano.
function currentView(currentvol) {
  console.log(currentvol);
  document.getElementById('volcano').innerHTML = currentvol.Name;
  document.getElementById('country').innerHTML = currentvol.Country;
  document.getElementById('vei').innerHTML = currentvol.VEI;
  document.getElementById('type').innerHTML = currentvol.Type;
  document.getElementById('lat').innerHTML = currentvol.Latitude;
  document.getElementById('long').innerHTML = currentvol.Longitude;
  document.getElementById('year').innerHTML = currentvol.Year;
  document.getElementById('descp').innerHTML = currentvol.Desc;

  document.getElementById('infobar').style.display = 'initial';
  document.getElementById('flip').style.display = 'initial';
}

function closeInfo() {
  document.getElementById('infobar').style.display = 'none';
  document.getElementById('flip').style.display = 'none';
  document.getElementById('panel').style.display = 'none';
}
