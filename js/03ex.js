console.log('entra-cookies actuales:\n' + document.cookie);
document.getElementById('atras').addEventListener('click', arrere);
document.getElementById('grabar').addEventListener('click', graba);
var nom = getCookie('nombre');
escriuCookies(nom);
function arrere() {
  window.location.href = 'pantalla02.html';
}
function deleteCookie(nombre) {
  setCookie(nombre, '', 0);
}
deleteCookie('knna77@gmail.com');
function setCookie(nombre, valor, expiracion) {
  var fecha = new Date();
  fecha.setTime(fecha.getTime() + 1000 * 60 * 60 * 24 * expiracion);
  var caduca = 'expires=' + fecha.toUTCString();
  document.cookie =
    nombre + '=' + valor + ';' + caduca + ';path=/;SameSite=Strict';
}
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
var cuestionario = [
  {
    correo: '',
    fecha: '',
    preguntas: [
      {
        titulo: '',
        respuesta: true,
        puntuacion: 0,
        estado: 'OK',
      },
    ],
  },
];
getCookie(nom);
var strCuestionario = JSON.stringify(cuestionario);
//var objCuerstionario = JSON.parse(strCuestionario);
let str2Cuestionario;
function graba() {
  var mail = getCookie('nombre');
  var fecha = getCookie('fecha');
  let preg = document.getElementById('pregunta').value;
  let punts = document.getElementById('puntos').value;
  let resps = document.getElementsByName('resposta');
  let resp;

  for (var i = 0, length = resps.length; i < length; i++) {
    if (resps[i].checked) {
      resp = resps[i].value;
      break;
    }
  }

  let persona = {
    correo: '',
    fech: '',
    preguntas: [
      {
        titulo: '',
        respuesta: true,
        puntuacion: 0,
        estado: 'OK',
      },
    ],
  };

  /*objCuerstionario.forEach((pers) => {
    objCuerstionario.push(pers);
  });*/
  var objCuerstionario = JSON.parse(strCuestionario);
  let cookPreg = getCookie(mail);
  if (cookPreg == '') {
  } else {
    let objPreg = JSON.parse(cookPreg);

    objPreg.forEach((pers) => {
      objCuerstionario.push(pers);
    });
  }
  persona.correo = mail;
  persona.fech = fecha;
  persona.preguntas[0].titulo = preg;
  persona.preguntas[0].respuesta = resp;
  persona.preguntas[0].puntuacion = punts;
  persona.preguntas[0].estado = 'OK';
  objCuerstionario.push(persona);

  objCuerstionario.shift();
  //console.log(objCuerstionario.length);
  str2Cuestionario = JSON.stringify(objCuerstionario);
  /* let obj2Cuerstionario = JSON.parse(str2Cuestionario);
  obj2Cuerstionario.forEach((persona) => {
    console.log(persona);
  });
  console.log('array-' + obj2Cuerstionario.toString());*/
  setCookie(mail, str2Cuestionario, 30);
  escriuCookies(mail);
  console.log('cookies actuales:\n' + document.cookie);
}
function escriuCookies(name) {
  document.getElementById('pregs').innerHTML =
    ' <tr><td>PREGUNTA</td><td>RESPUESTA</td><td>PUNTUACION</td><td>ESTADO</td></tr>';
  let cookPreg = getCookie(name);
  if (cookPreg == '') {
  } else {
    let objPreg = JSON.parse(cookPreg);

    objPreg.forEach((pers) => {
      document.getElementById('pregs').innerHTML +=
        '<tr><td>' +
        pers.preguntas[0].titulo +
        '</td><td>' +
        pers.preguntas[0].respuesta +
        '</td><td>' +
        pers.preguntas[0].puntuacion +
        '</td><td>' +
        pers.preguntas[0].estado +
        '</td></tr>';
    });
  }
}
console.log('ix-cookies actuales:\n' + document.cookie);
