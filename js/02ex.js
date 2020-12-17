function getCookie(nombre) {
  var name = nombre + '=';

  var decodedCookie = decodeURIComponent(document.cookie);

  var array = decodedCookie.split(';');
  for (var i = 0; i < array.length; i++) {
    var c = array[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
var mail = getCookie('nombre');
var fecha = getCookie('fecha');
var hora = getCookie('hora');
document.getElementById('nombre').innerHTML = mail;
document.getElementById('fecha').innerHTML = fecha;
document.getElementById('hora').innerHTML = hora;
console.log('mail' + mail);
console.log('fecha' + fecha);
console.log('hora' + hora);
console.log('cookies actuales:\n' + document.cookie);
