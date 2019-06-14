// Listens for the mouse to be pressed down and then runs the mouseDown function.
document.getElementById("slidertab1").addEventListener("mousedown", mouseDown);
document.getElementById("slidertab2").addEventListener("mousedown", mouseDown);
var varmouse = true;
var sliderid;

// runs the mouseMove function when the mouse moves sets varmoues to false when
// the mouse is unpressed.
function mouseDown(e) {
  sliderid = this.id.toString();

  console.log(sliderid);
  varmouse = true;
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener("mouseup", function (e) {
    varmouse = false;
  });
}

// Sets the position of the slider based on the x coordinates of the mouse.
function mouseMove(e) {
  console.log(varmouse);
  var sliderpos = e.x;
  sliderRules();
  document.getElementById(sliderid).style.left = sliderpos;



  //var posnorm = 2015 - (norm(sliderpos, 0, window.innerWidth - 8) * 6375);
  //var posnorm = Math.floor(2015 - ((1 - (norm(sliderpos, 0, window.innerWidth - 8))) * 6375));

  var posnorm = norm(Math.log(sliderpos), 0, Math.log(window.innerWidth - 8));
  var norminverse = 1 - posnorm;
  var yeardec = 2015 - (norminverse * 6375);
  var year = Math.floor(yeardec);


  document.getElementById('counter').innerHTML = year;

  //console.log(posnorm);


  if (sliderid == 'slidertab1') {
    yearquery1 = year;
    drawPoint();
  }
  if (sliderid == 'slidertab2') {
    yearquery2 = year;
    drawPoint();
  }


  // If varmouse is false, the slider will no longer move.
  if (varmouse == false) {
    document.removeEventListener('mousemove', mouseMove);

  }


  function sliderRules() {
    if (sliderpos < 0) {
      sliderpos = 0;
    }

    if (sliderpos > window.innerWidth - 8) {
      sliderpos = window.innerWidth - 8;
    }
  }
}
