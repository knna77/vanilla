document.getElementById('atras').addEventListener('click', myFunction);

function myFunction() {
  window.location.href = 'pantalla02.html';
}
function construJson(pregunta, bul, punts) {
  id = 0;
  pregun =
    ' pregunta = {id:' +
    id +
    ' , ' +
    pregunta +
    ':' +
    bul +
    ' , puntos:' +
    punts +
    '}';
}
