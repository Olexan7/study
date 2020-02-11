let rect = document.getElementById('rect');
let trapt = document.getElementById('trapt');
let simps = document.getElementById('simps');

rect.onclick = function(){
  let a = parseFloat(document.getElementById('a').value);
  let b = parseFloat(document.getElementById('b').value);
  let m = parseFloat(document.getElementById('m').value);
  let eps = parseFloat(document.getElementById('eps').value);
  document.getElementById('answer').innerHTML = '';
  let script = document.createElement('script');
  script.innerHTML = "function f(x) {return " + func.value + "};"
  document.getElementsByTagName('head')[0].appendChild(script);
  CalcRectangleLeft(f, a, b, m, eps);
  CalcRectangleRight(f, a, b, m, eps);
}

trapt.onclick = function(){
  let a = parseFloat(document.getElementById('a').value);
  let b = parseFloat(document.getElementById('b').value);
  let m = parseFloat(document.getElementById('m').value);
  let eps = parseFloat(document.getElementById('eps').value);
  document.getElementById('answer').innerHTML = '';
  let script = document.createElement('script');
  script.innerHTML = "function f(x) {return " + func.value + "};"
  document.getElementsByTagName('head')[0].appendChild(script);
  CalcTrapezion(f, a, b, m, eps);
}

simps.onclick = function(){
  let a = parseFloat(document.getElementById('a').value);
  let b = parseFloat(document.getElementById('b').value);
  let m = parseFloat(document.getElementById('m').value);
  let eps = parseFloat(document.getElementById('eps').value);
  document.getElementById('answer').innerHTML = '';
  let script = document.createElement('script');
  script.innerHTML = "function f(x) {return " + func.value + "};"
  document.getElementsByTagName('head')[0].appendChild(script);
  CalcSimpson(f, a, b, m, eps);
}
