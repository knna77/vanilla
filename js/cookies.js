export function setCookie(nombre, valor, expiracion) {
  var fecha = new Date();
  fecha.setTime(fecha.getTime() + 1000 * 60 * 60 * 24 * expiracion);
  var caduca = 'expires=' + fecha.toUTCString();

  document.cookie =
    nombre + '=' + valor + ';' + caduca + ';path=/;SameSite=Strict';
}

export function getCookie(nombre) {
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

export function deleteCookie(nombre) {
  setCookie(nombre, '', 0);
}

export function verCookies() {
  console.log('cookies actuales:\n' + document.cookie);
}
