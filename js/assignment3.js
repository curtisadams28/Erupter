let data;
let datam = [];
let dataf = [];
let country = 'japan';
let yearquery = 1990;
let maxpopulation = [];

function preload() {
  data = loadJSON('worlddata.json');
}

function setup() {
  createCanvas(2000, 2000);

  // Assigns HTML elements to variables.
  var slideroutput = document.getElementById("yearDisplay");
  var slider = document.getElementById("myRange");

  // Sets the yearDisplay element to the default value of the slider.
  slideroutput.innerHTML = slider.value;

  // Updates the visualisation each time the slider is moved.
  slider.oninput = function() {

    // Sets yearDisplay element to the updated value.
    slideroutput.innerHTML = this.value;

    // Updates the yearquery used to retrive the data.
    yearquery = this.value;

    // runs the draw function once.
    redraw(1);

  }
  // calculates the max value and the number of lines on the scale.
  maxpop();
}

function draw() {

  clear(); // Clears the canvas.
  jsonToArray1(); // Retrieves json data and places it in an array.
  maxYear();
  drawGraph();
  ageScale();
  drawScale();
  labels();
  noLoop(); // Stops the draw function looping at the set framerate.
}

// Calculates the highest year for a particular country.
function maxYear() {
  var count = 0;
  for (let i = 0; i < data[country]['m'].length; i++) {
    istring = i.toString();
    var years = data[country]['f'][istring]['Year'];
    if (count < years) {
      count = years;
    }
  }
  // Sets Max attribute of slider to the highest year in the data.
  var slider = document.getElementById("myRange");
  slider.setAttribute("Max", count);
}


// Creates the bars for the graph
function drawGraph() {

  var ycor = 400; //Sets the y coordinates for the base of the graph.

  // Iterates through the datam array and draws each bar.
  for (let i = 0; i < datam.length; i++) {
    strokeWeight(0);
    fill('#7CBBEA');

    // Normalises each value in the array into a value between 0 and 1.
    var normalised = norm(datam[i], 0, maxpopulation[1]);
    // Takes the normalised value and multiplies it to get the length of the bar.
    var barlength = ((normalised * 300));

    // Draws the bars
    rect(500, ycor, barlength, 18);
    ycor = ycor - 20;
  }


  var ycorf = 400;

  // The same as the above for loop but for females.
  for (let i = 0; i < dataf.length; i++) {
    strokeWeight(0);
    fill('pink');
    var normalisedf = norm(dataf[i], 0, maxpopulation[1]);
    var barlengthf = ((normalisedf * -300));
    rect(440, ycorf, barlengthf, 18);
    ycorf = ycorf - 20;
  }

}

// Creates the scale for the different age groups through the middle.
function ageScale() {
  textSize(12);

  var ycort = 415;
  var agestart = 0;
  var ageend = 4;
  fill('grey');

  // iterates through the 21 age groups.
  for (let i = 0; i < 20; i++) {

    textAlign(CENTER);

    // Writes the age to the canvas.
    text(agestart + ' - ' + ageend, 470, ycort);

    // Updates the y coordinates and the range of ages.
    ycort = ycort - 20;
    agestart = agestart + 5;
    ageend = ageend + 5;

  }
  // Draws the final age
  text('100+', 470, ycort);
}

// Creates the population scale at the bottom.
function drawScale() {


  var popshort = (maxpopulation[1] / 1000) / maxpopulation[0];
  var count = 0;
  //console.log(popshort);

  strokeWeight(1);
  // Draws the axis lines
  line(500, 418, 800, 418);
  line(440, 418, 140, 418);

  // Sets the starting x coordinates for the numbers and dashes.
  var xcorm = 500;
  var xcorf = 440;

  for (let i = 0; i <= maxpopulation[0]; i++) {
    // Draws the numbers.
    text(count, xcorm, 440);
    text(count, xcorf, 440);

    // Draws the dashes.
    line(xcorm, 418, xcorm, 425);
    line(xcorf, 418, xcorf, 425);

    // Updates the coordinates for the position of the next number/dash.
    var pointspace = 300/maxpopulation[0];
    xcorm = xcorm + pointspace;
    xcorf = xcorf - pointspace;
    count = count + popshort;
    // Rounding used as workaround because of bug where a large amount of trailing 0's would be added.
    count = Math.round(count * 100) / 100;


  }
}

// Draws the x-axis labels
function labels() {
  textSize(20);
  text('Female Population (Millions)', 300, 480);
  text('Male Population (Millions)', 650, 480);
}

function countrySelect() {
  var countryinput = document.getElementById("countryinput");
  country = countryinput.value;
  maxpop();
  redraw(1);
}



function maxpop() {

  var yeararray = [];
  // Iterates through all records for a particular country.
  for (let i = 0; i < data[country]['m'].length; i++) {
    istring = i.toString();
    // Creates an array of all data for males and females of a particular year.
    var yearpopm = Object.values(data[country]['m'][istring]);
    var yearpopf = Object.values(data[country]['f'][istring]);
    // Removes the first element in the array (year).
    yearpopm.shift();
    yearpopf.shift();
    // Combines two arrays for a particualr year.
    var both = yearpopm.concat(yearpopf);
    // Adds the array of a particular year to an array of all years.
    yeararray = yeararray.concat(both);
      //console.log(both);

  }

  var popcount = 0;
  var normalpop;

  // finds the highests record of population
  for (let i = 0; i < yeararray.length; i++) {
    if (yeararray[i] > popcount) {
      popcount = yeararray[i];
    }
  }

  // Rounds the population up depending on how large the number is.
  if (popcount >= 10000) {
    // Removes all digits except for the first from the number. This number is used to create the x-axis scale.
    popcount = Math.ceil(popcount / 10000);
    // Adds 0's back to round to the nearest 10000;
    normalpop = popcount * 10000;
  }

  if (popcount >= 1000) {
    popcount = Math.ceil(popcount / 1000);
    normalpop = popcount * 1000;
  }
  if (popcount >= 100) {
    popcount = Math.ceil(popcount / 100);
    normalpop = popcount * 100;
  }
  if (popcount >= 10) {
    popcount = Math.ceil(popcount / 10);
    normalpop = popcount * 10;
  }


  maxpopulation = [popcount, normalpop];

  // doubles the popcount variable if it is 5 or less.
  if (maxpopulation[0] <= 5 && maxpopulation[0] > 1) {
    maxpopulation[0] = maxpopulation[0] * 2;
  }
  // makes maxpopulation = 10 so that there is never 1 point on the axis.
  if (maxpopulation[0] == 1) {
    maxpopulation[0] = maxpopulation[0] * 10;
  }

  console.log(maxpopulation);
}

// Retrieves the data from the json file for a specific year and country. It then pushes the selected information to an array.
function jsonToArray1() {

  datam = [];
  dataf = [];



  // Iterates through all male records.
  for (let i = 0; i < data[country]['m'].length; i++) {
    // Converts i to a string so that it can be used inside bracket object notation.
    istring = i.toString();



    // Pushes data to an array based on the yearquery variable.
    if (data[country]['m'][istring].Year == yearquery) {
      datam.push(data[country]['m'][istring]['age_0_4']);
      datam.push(data[country]['m'][istring]['age_5_9']);
      datam.push(data[country]['m'][istring]['age_10_14']);
      datam.push(data[country]['m'][istring]['age_15_19']);
      datam.push(data[country]['m'][istring]['age_20_24']);
      datam.push(data[country]['m'][istring]['age_25_29']);
      datam.push(data[country]['m'][istring]['age_30_34']);
      datam.push(data[country]['m'][istring]['age_35_39']);
      datam.push(data[country]['m'][istring]['age_40_44']);
      datam.push(data[country]['m'][istring]['age_45_49']);
      datam.push(data[country]['m'][istring]['age_50_54']);
      datam.push(data[country]['m'][istring]['age_55_59']);
      datam.push(data[country]['m'][istring]['age_60_64']);
      datam.push(data[country]['m'][istring]['age_65_69']);
      datam.push(data[country]['m'][istring]['age_70_74']);
      datam.push(data[country]['m'][istring]['age_75_79']);
      datam.push(data[country]['m'][istring]['age_80_84']);
      datam.push(data[country]['m'][istring]['age_85_89']);
      datam.push(data[country]['m'][istring]['age_90_94']);
      datam.push(data[country]['m'][istring]['age_95_99']);
      datam.push(data[country]['m'][istring]['age_100']);
    }
  }

  // Same as the above for loop except for females.
  for (let i = 0; i < data[country]['f'].length; i++) {
    if (data.japan.f[i].Year == yearquery) {
      istring = i.toString();
      dataf.push(data[country]['f'][istring]['age_0_4']);
      dataf.push(data[country]['f'][istring]['age_5_9']);
      dataf.push(data[country]['f'][istring]['age_10_14']);
      dataf.push(data[country]['f'][istring]['age_15_19']);
      dataf.push(data[country]['f'][istring]['age_20_24']);
      dataf.push(data[country]['f'][istring]['age_25_29']);
      dataf.push(data[country]['f'][istring]['age_30_34']);
      dataf.push(data[country]['f'][istring]['age_35_39']);
      dataf.push(data[country]['f'][istring]['age_40_44']);
      dataf.push(data[country]['f'][istring]['age_45_49']);
      dataf.push(data[country]['f'][istring]['age_50_54']);
      dataf.push(data[country]['f'][istring]['age_55_59']);
      dataf.push(data[country]['f'][istring]['age_60_64']);
      dataf.push(data[country]['f'][istring]['age_65_69']);
      dataf.push(data[country]['f'][istring]['age_70_74']);
      dataf.push(data[country]['f'][istring]['age_75_79']);
      dataf.push(data[country]['f'][istring]['age_80_84']);
      dataf.push(data[country]['f'][istring]['age_85_89']);
      dataf.push(data[country]['f'][istring]['age_90_94']);
      dataf.push(data[country]['f'][istring]['age_95_99']);
      dataf.push(data[country]['f'][istring]['age_100']);
    }

  }

}
