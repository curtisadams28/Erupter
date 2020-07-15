// Listens for the mouse to be pressed down and then runs the mouseDown function.
document.getElementById("slidertab1").addEventListener("mousedown", mouseDown);
document.getElementById("slidertab2").addEventListener("mousedown", mouseDown);
let varmouse = true;
let sliderid;
let slidertab1 = 0;
let slidertab2 = 124;
let barwidth = 124;
let sliderLimit = false;

document.getElementById("slidertab1").style.left = slidertab1 + "px";
document.getElementById("slidertab2").style.left = slidertab2 + "px";

// runs the mouseMove function when the mouse moves sets varmouse to false when
// the mouse is unpressed.
function mouseDown() {
  sliderId = this.id.toString();

  varmouse = true;
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", function () {
    varmouse = false;
  });
}

// Sets the position of the slider based on the x coordinates of the mouse.
function mouseMove(e) {
  let sliderpos = cursorRules(e.x, sliderId);

  if (sliderId === "slidertab2" && sliderpos <= slidertab1 + 90) {
    sliderpos = slidertab1 + 90;
  }
  if (sliderId === "slidertab1" && sliderpos >= slidertab2 - 90) {
    sliderpos = slidertab2 - 90;
  }

  //document.getElementById(sliderid).style.left = sliderpos;

  // If varmouse is false, the slider will no longer move.
  if (varmouse == false) {
    document.removeEventListener("mousemove", mouseMove);
  }

  let posnorm = norm(sliderpos, 0, window.innerWidth - 8);
  let year = Math.floor(1800 + posnorm * 215);

  //let year = getYearFromPos(sliderpos);

  setSliderPos(sliderpos, sliderId);

  let yearId;
  if (sliderId === "slidertab1") {
    yearId = "year1";
    slidertab1 = sliderpos;
  } else {
    yearId = "year2";
    slidertab2 = sliderpos;
  }
  setSliderYear(sliderpos, yearId, year);
  setSliderBar();
}

// General rules for preventing unwanted positioning behaviour for the sliders.
function cursorRules(cursorX, sliderId) {
  // Stops slider from going off the screen.
  if (cursorX < 0) {
    cursorX = 0;
  }
  if (cursorX > window.innerWidth - 8) {
    cursorX = window.innerWidth - 8;
    sliderLimit = true;
  }
  /*

  if (sliderId === "slidertab2" && cursorX < slidertab1 + 90) {
    cursorX = slidertab1 + 90;
  }
  if (sliderId === "slidertab1" && cursorX > slidertab2 - 90) {
    cursorX = slidertab1 - 90;
  }
  */

  /*
  if ((sliderId = "slidertab1")) {
    console.log(slidertab1, cursorX, sliderId);
  }
  if ((sliderId = "slidertab2")) {
    console.log(slidertab2, cursorX, sliderId);
  }
  */

  /*
  else {
    sliderLimit = false;
  }
  console.log(sliderLimit);

  if (sliderId === "slidertab1" && sliderLimit === true) {
    console.log("limit reached");

    cursorX = slidertab2 - barwidth;
  }
  */

  // Stops the sliders from getting too close to each other.
  /*
  if (sliderId === "slidertab1" && cursorX > slidertab2 - 90) {
    cursorX = slidertab2 - 90;
  }

  if (sliderId === "slidertab2" && cursorX < slidertab1 + 90) {
    cursorX = slidertab1 + 90;
  }

  */
  return cursorX;
}

function setSliderPos(cursorX, sliderTab) {
  drawPoint();
  /*
  if (sliderTab === "slidertab1" && cursorX > slidertab2 - 100) {
    console.log("gone over");
    cursorX = slidertab2 - 100;
  }
  */
  /*
  if (sliderTab === "slidertab1" && cursorX > window.innerWidth - 200) {
    console.log("met");

    cursorX = window.innerWidth - 200;
  }
  */
  document.getElementById(sliderTab).style.left = cursorX + "px";
}

function setSliderYear(cursorX, textId, year) {
  document.getElementById(textId).innerHTML = year;
  document.getElementById(textId).style.left = cursorX - 15 + "px";
  if (cursorX <= 18) {
    document.getElementById(textId).style.left = cursorX + "px";
  }
  if (cursorX >= window.windowWidth - 23) {
    document.getElementById(textId).style.left = cursorX - 30 + "px";
  }
  if (textId === "year1") {
    yearquery1 = year;
  } else {
    yearquery2 = year;
  }
}
function setSliderBar() {
  barwidth = slidertab2 - slidertab1;
  document.getElementById("sliderbar").style.width = barwidth + "px";
  document.getElementById("sliderbar").style.left = slidertab1 + 4 + "px";
}

let barlengthToCursor;
document.getElementById("sliderbar").addEventListener("mousedown", sliderClick);

function sliderClick(e) {
  let mouseX = e.x;
  // Calculates the length from the left slider tab to the x position of the cursor.
  barlengthToCursor = mouseX - slidertab1;

  document.addEventListener("mousemove", barMove);
}
function barMove(e) {
  // Calculates how far left the bar needs to be from the position of the cursor.

  //let mouseX = cursorRules(e.x);

  let sliderPosLeft = cursorRules(e.x - barlengthToCursor, "slidertab1");
  let sliderPosRight = cursorRules(
    sliderPosLeft + slidertab2 - slidertab1,
    "slidertab2"
  );

  let sliderCheck;
  let newbarwidth = sliderPosRight - sliderPosLeft;

  if (sliderPosLeft + slidertab2 - slidertab1 > window.innerWidth - 8) {
    console.log("over");

    sliderPosLeft = sliderPosRight - newbarwidth;
  }
  /*
  if (sliderPosRight > window.innerWidth - 8) {
    sliderPosLeft = sliderPosRight - barwidth;
  }
  */

  /*
  console.log("sliderleft", sliderPosLeft);
  console.log("sliderright", sliderPosRight);
  console.log("barwidth", barwidth);
  */

  document.getElementById("sliderbar").style.left = sliderPosLeft + "px";
  document.addEventListener("mouseup", sliderClickUp);

  setSliderPos(sliderPosLeft, "slidertab1");
  slidertab1 = sliderPosLeft;
  setSliderPos(sliderPosRight, "slidertab2");
  slidertab2 = sliderPosRight;

  setSliderYear(slidertab1, "year1", getYearFromPos(sliderPosLeft));
  setSliderYear(slidertab2, "year2", getYearFromPos(sliderPosRight));
}

function sliderClickUp() {
  document.removeEventListener("mousemove", barMove);
}
function getYearFromPos(sliderX) {
  let posnorm = norm(sliderX, 0, window.innerWidth - 8);
  let year = Math.floor(1800 + posnorm * 215);
  return year;
}
