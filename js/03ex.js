import { getCookie, setCookie } from './cookies.js';
document.getElementById('atras').addEventListener('click', arrere);
document.getElementById('grabar').addEventListener('click', graba);
var nom = getCookie('nombre');
//escribim les preguntes en la taula
escriuCookies(nom);
//reconducció a la pantalla2
function arrere() {
  window.location.href = 'pantalla02.html';
}
//objecte cuestionario
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
//Aquesta funcio fa totes les comprovacions
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
var str2Cuestionario;
//quan presionem el botó "Grabar"
function graba() {
  //Agafem les dades
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
  //comprovem
  if (comprovaPreg(preg, resp, punts) == true) {
    //Li mostrem al usuari que estem guardant la pregunta
    escriuTaula(preg, resp, punts, 'Guardando');
    //borrem el botó "Atrás"
    document.getElementById('atras').style.display = 'none';
    //recuperem les dades gravades a les cookies
    let mail = getCookie('nombre');
    let fecha = getCookie('fecha');
    setTimeout(() => {
      //Objecte persona
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
      //Passem el cuestionario de json a bjecte
      let objCuerstionario = JSON.parse(strCuestionario);
      let cookPreg = getCookie(mail);
      if (cookPreg == '') {
        //esta part era per si fallava per a utilitzar el reject de les promeses
      } else {
        //pasem les dades obteses de l'usuari a objecte
        let objPreg = JSON.parse(cookPreg);
        objPreg.forEach((pers) => {
          objCuerstionario.push(pers);
        });
      }
      //carreguem les noves dades
      persona.correo = mail;
      persona.fech = fecha;
      persona.preguntas[0].titulo = preg;
      persona.preguntas[0].respuesta = resp;
      persona.preguntas[0].puntuacion = punts;
      persona.preguntas[0].estado = 'OK';
      //Afegim les dades al array/objecte
      objCuerstionario.push(persona);
      //Extreguem la capsalera (el primer lloc de l'array)
      objCuerstionario.shift();
      //recombertim el objecte a json
      str2Cuestionario = JSON.stringify(objCuerstionario);
      //resecribim la cookie
      setCookie(mail, str2Cuestionario, 30);
      //mostrem el botó "Atrás"
      document.getElementById('atras').style.display = 'block';
      if (mail == '') {
        //reject('Herror de datos ');
      } else {
        //resolve
        escriuCookies(mail);
      }
    }, 5000);
  }
}
//Escriu el json de l'usuari en la taula
function escriuCookies(name) {
  var cont = 0;
  document.getElementById('pregs').innerHTML =
    ' <tr><td>PREGUNTA</td><td>RESPUESTA</td><td>PUNTUACION</td><td>ESTADO</td></tr>';
  let cookPreg = getCookie(name);
  if (cookPreg == '') {
  } else {
    let objPreg = JSON.parse(cookPreg);

    objPreg.forEach((pers) => {
      cont++;
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
  return cont;
}
//escriu la pregunta que s'està guardant a la taula
function escriuTaula(preg, resp, punts, estado) {
  document.getElementById('pregs').innerHTML +=
    '<tr><td>' +
    preg +
    '</td><td>' +
    resp +
    '</td><td>' +
    punts +
    '</td><td>' +
    estado +
    '</td></tr>';
}
