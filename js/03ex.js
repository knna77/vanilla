import { getCookie, setCookie, verCookies } from './cookies.js';
document.getElementById('atras').addEventListener('click', arrere);
document.getElementById('grabar').addEventListener('click', graba);
var nom = getCookie('nombre');
//escribim les preguntes en la taula
escriuCookies(nom);
//reconducció a la pantalla2
function arrere() {
  window.location.href = 'pantalla02.html';
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
function comprovaPreg(pregunta, resposta, punts) {
  let preg = false;
  let resp = false;
  let pun = false;
  if (pregunta != '') {
    preg = true;
  }
  if (punts != '' || isNaN(punts) != false) {
    if (punts <= 9 && punts >= 0) {
      pun = true;
    }
  }
  if (resposta != undefined) {
    resp = true;
  }
  if (preg == true && resp == true && pun == true) {
    return true;
  } else {
    return false;
  }
}
var strCuestionario = JSON.stringify(cuestionario);
let str2Cuestionario;
function graba() {
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

  if (comprovaPreg(preg, resp, punts) == true) {
    var mail = getCookie('nombre');
    var fecha = getCookie('fecha');
    escriuCookies(mail, 'guardando');
    setTimeout(() => {
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

      let objCuerstionario = JSON.parse(strCuestionario);
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
      str2Cuestionario = JSON.stringify(objCuerstionario);
      setCookie(mail, str2Cuestionario, 30);
      escriuCookies(mail, 'guardando');
      // verCookies();
      document.getElementById('atras').style.display = 'block';
    }, 5000);
    escriuTaula(mail, preg, resp, punts);
    document.getElementById('atras').style.display = 'none';
  }
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
function escriuTaula(name, preg, resp, punts) {
  escriuCookies(name);
  document.getElementById('pregs').innerHTML +=
    '<tr><td>' +
    preg +
    '</td><td>' +
    resp +
    '</td><td>' +
    punts +
    '</td><td>Guardando</td></tr>';
}
