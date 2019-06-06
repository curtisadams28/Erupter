let data;
let yearquery1 = 1995;
let yearquery2 = 1996;

function preload() {
  data = loadJSON('data/eruption_data.json');
}
function setup() {

  for (var i = 0; i < data.eruptions.length; i++) {
    if (data.eruptions[i].Year >= yearquery1 && data.eruptions[i].Year <= yearquery2) {
      console.log(data.eruptions[i]);
    }
  }
}

function draw() {

}
