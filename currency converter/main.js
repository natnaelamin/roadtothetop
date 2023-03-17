document.getElementById("output").style.visibility = "hidden";
document.getElementById("dlinput").addEventListener("input", function (e) {
  let dl = e.target.value;
  document.getElementById("output").style.visibility = "visible";

  document.getElementById("pdoutput").innerHTML = dl * 0.83;

  document.getElementById("euoutput").innerHTML = dl * 0.94;
  document.getElementById("broutput").innerHTML = dl * 53.8;
});
