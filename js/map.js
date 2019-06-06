let data;
let yearquery1 = 1999;
let yearquery2 = 1999;
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
  style: 'mapbox://styles/mapbox/traffic-night-v2',
  compact: true,
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
