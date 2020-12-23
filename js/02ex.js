import { getCookie, setCookie, deleteCookie } from './cookies.js';
//recuperem el nom
var mail = getCookie('nombre');
//creem una nova cookie identificada
var user = getCookie('user' + mail);
let strUser;
let objUser;
document.getElementById('nombre').innerHTML = mail;
if (user == '') {
  document.getElementById('n1').innerHTML = 'Es tu primera visita';
} else {
  objUser = JSON.parse(user);
  document.getElementById('n1').innerHTML =
    'La última vez que entraste fue el:<br/>';
  let data = objUser.fech;
  document.getElementById('fecha').innerHTML = data;
  document.getElementById('n2').innerHTML = 'a las:';
  let tiempo = objUser.hora;
  document.getElementById('hora').innerHTML = tiempo;
}
deleteCookie('user' + mail);
let caduca = 30;
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hora = date.getHours();
let mins = date.getMinutes();
let seg = date.getSeconds();
let fecha = `${day}/${month}/${year}`;
let horas = `${hora}:${mins}:${seg}`;
//objecte amb les dades d'esta pantalla
user = {
  correo: mail,
  fech: fecha,
  hora: horas,
};
//passem l'ojecte a json
strUser = JSON.stringify(user);
//gravem el  json en la cookie
setCookie('user' + mail, strUser, caduca);
