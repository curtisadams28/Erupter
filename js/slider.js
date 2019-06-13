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
  document.getElementById('slidertab').style.left = e.x;
  document.getElementById('counter').innerHTML = e.x;
  if (varmouse == false) {
    document.removeEventListener('mousemove', mouseMove);
  }
}
