let xml;

function preload() {
  xml = loadXML('cordinates.txt');
}

let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


function setup(){
  canvas = createCanvas(640,640);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  fill('red');
  myMap.onChange(drawPoint);

  let children = xml.getChildren('place');
  for (let i = 0; i < children.length; i++) {
    let id = children[i].getNum('id');
    let lat = children[i].getNum('lat');
    let long = children[i].getNum('long');
    print(id + ', ' + lat + ', ' + long);
  }
}

function draw(){

}

function drawPoint(){
  clear();

  const nigeria = myMap.latLngToPixel(11.396396, 5.076543);
  ellipse(nigeria.x, nigeria.y, 20, 20);
}
