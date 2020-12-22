import { setCookie } from './cookies.js';
//Un event cntl+f10
function isKeyPressed(event) {
  if (event.ctrlKey && event.keyCode == 121) {
    if (document.querySelector('input') == null) {
      creaH1('Usuario');
      creaInput();
    }
  }
}
//cridem a isKeyPressed quan soltem les tecles
document.addEventListener('keydown', isKeyPressed);
function retarda(temps) {
  var promesa = new Promise((resolve) => {
    setTimeout(() => {
      if (document.querySelector('input') == null) {
        creaH1('Usuario');
        creaInput();
        resolve('elemento creado por tiempo');
      }
    }, temps);
  });
  promesa.then((res) => {
    console.log(promesa);
  });
}
//crea un element h1 amb el text que passem per parametre
function creaH1(text) {
  let h = document.createElement('H1');
  let t = document.createTextNode(text);
  h.appendChild(t);
  document.body.appendChild(h);
}
//crea un input
function creaInput() {
  console.log('input');
  let input = document.createElement('input');
  document.body.appendChild(input);
  setTimeout(() => {
    input.focus();
  }, 1);
  input.addEventListener('blur', function (ev) {
    let exp = /^[^@]+@[^@]+\.[a-zA-Z0-9_]{2,}$/;
    if (exp.test(input.value) == false) {
      document.getElementById('info').innerHTML =
        '<p>Error: Correo no válido</p>';
      setTimeout(() => {
        input.focus();
        input.select();
      }, 1);
    } else {
      let nombre = input.value;
      let caduca = 30;
      setCookie('nombre', nombre, caduca);
      window.location.href = 'pantalla02.html';
    }
  });
}
retarda(5000);
