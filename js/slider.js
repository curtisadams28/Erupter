document.getElementById("slidertab").addEventListener("mousedown", mouseDown);
var varmouse = true;
function mouseDown(e) {
  varmouse = true;
  var position = e.x + "px";
  document.addEventListener('mousemove', mouseMove);

  document.addEventListener("mouseup", function (e) {
    varmouse = false;
  });
}
function mouseMove(e) {
  console.log(varmouse);
  var sliderpos = e.x;
  sliderRules();
  document.getElementById('slidertab').style.left = sliderpos;
  document.getElementById('counter').innerHTML = e.x;
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
