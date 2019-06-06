let data;
let yearquery1 = 1995;
let yearquery2 = 1999;
let query = [];

let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

const options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload() {
  data = loadJSON('data/eruption_data.json');
}
function setup() {
  jsonToArray();

  canvas = createCanvas(windowWidth,windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  fill(200, 100, 100);


  myMap.onChange(drawPoint);

}

function draw() {

}

function drawPoint(){
  clear();
  for (var i = 0; i < query.length; i++) {
    var volcano = myMap.latLngToPixel(query[i].Latitude, query[i].Longitude);
    var normvei = norm(query[i].VEI, 0, 8);
    var circlesize = normvei * 50;
    console.log(normvei);
    ellipse(volcano.x, volcano.y, circlesize, circlesize);
  }

}

function jsonToArray() {
  for (var i = 0; i < data.eruptions.length; i++) {
    if (data.eruptions[i].Year >= yearquery1 && data.eruptions[i].Year <= yearquery2) {
      //console.log(data.eruptions[i]);
      query.push(data.eruptions[i]);
    }
  }
  console.log(query);
}
