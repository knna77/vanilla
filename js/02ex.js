import { getCookie, setCookie, deleteCookie } from './cookies.js';
var mail = getCookie('nombre');
var user = getCookie('user' + mail);
let strUser;
let objUser;
console.log('user:' + user);
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
user = {
  correo: mail,
  fech: fecha,
  hora: horas,
};
strUser = JSON.stringify(user);
setCookie('user' + mail, strUser, caduca);
/*var fecha = getCookie('fecha');
var horas = getCookie('hora');*/

console.log('mail' + mail);
console.log('fecha' + fecha);
console.log('hora' + horas);
//console.log('cookies actuales:\n' + document.cookie);

/*setCookie('fecha', fechaN, caduca);
setCookie('hora', tiempo, caduca);*/
