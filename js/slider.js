// Listens for the mouse to be pressed down and then runs the mouseDown function.
document.getElementById("slidertab1").addEventListener("mousedown", mouseDown);
document.getElementById("slidertab2").addEventListener("mousedown", mouseDown);
var varmouse = true;
var sliderid;
var slidertab1 = 0;
var slidertab2 = 200;

// runs the mouseMove function when the mouse moves sets varmoues to false when
// the mouse is unpressed.
function mouseDown(e) {
  sliderid = this.id.toString();
  varmouse = true;
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener("mouseup", function (e) {
    varmouse = false;
  });
}

// Sets the position of the slider based on the x coordinates of the mouse.
function mouseMove(e) {
  var sliderpos = e.x;
  sliderRules();
  document.getElementById(sliderid).style.left = sliderpos;


  // If varmouse is false, the slider will no longer move.
  if (varmouse == false) {
    document.removeEventListener('mousemove', mouseMove);

  }


  //var posnorm = 2015 - (norm(sliderpos, 0, window.innerWidth - 8) * 6375);
  //var posnorm = Math.floor(2015 - ((1 - (norm(sliderpos, 0, window.innerWidth - 8))) * 6375));
  /*
  var posnorm = norm(Math.log(sliderpos), 0, Math.log(window.innerWidth - 8));
  var norminverse = 1 - posnorm;
  var yeardec = 2015 - (norminverse * 6375);
  var year = Math.floor(yeardec);
  */
  if (sliderpos == 0) {
    sliderpos = 1;
  }
  var posnorm = norm(Math.log(sliderpos), 0, Math.log(window.innerWidth - 8));

  //var norminverse = 1 - posnorm;

  var yeardec = 1800 + (posnorm * 215);
  var year = Math.floor(yeardec);
  document.getElementById('counter').innerHTML = year;

  // inbetween sliders

  if (sliderid == 'slidertab1') {
    slidertab1 = sliderpos;
    yearquery1 = year;
    drawPoint();
    document.getElementById('year1').innerHTML = year;
    document.getElementById('year1').style.left = (sliderpos - 15) + 'px';
    if (sliderpos <= 18) {
      document.getElementById('year1').style.left = (sliderpos) + 'px';
    }

  }
  if (sliderid == 'slidertab2') {

    slidertab2 = sliderpos;
    yearquery2 = year;
    drawPoint();
    document.getElementById('year2').innerHTML = year;
    document.getElementById('year2').style.left = (sliderpos - 12) + 'px';
    if (sliderpos >= window.windowWidth - 23) {
      document.getElementById('year2').style.left = (sliderpos - 30) + 'px';
    }

  }
  var barwidth = slidertab2 - slidertab1;
  console.log(typeof barwidth);
  document.getElementById('sliderbar').style.width = barwidth + 'px';
  document.getElementById('sliderbar').style.left = slidertab1 + 4 + 'px';


  function sliderRules() {
    if (sliderpos < 0) {
      sliderpos = 0;
    }

    if (sliderpos > window.innerWidth - 8) {
      sliderpos = window.innerWidth - 8;
    }

  }
}
