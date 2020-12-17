function isKeyPressed(event) {
  if (event.ctrlKey && event.keyCode == 121) {
    if (document.querySelector('input') == null) {
      creaH1('Usuario');
      creaInput();
    }
  }
}
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

function creaH1(text) {
  let h = document.createElement('H1');
  let t = document.createTextNode(text);
  h.appendChild(t);
  document.body.appendChild(h);
}

function creaInput() {
  console.log('input');
  let input = document.createElement('input');
  input.getAttribute('id', 'mail');
  document.body.appendChild(input);
  setTimeout(() => {
    input.focus();
  }, 1);
  input.addEventListener('blur', function (ev) {
    let exp = /^[^@]+@[^@]+\.[a-zA-Z0-9_]{2,}$/;
    if (exp.test(input.value) == false) {
      //ev.preventDefault();
      document.getElementById('info').innerHTML =
        '<p>Error: Correo no válido</p>';
      setTimeout(() => {
        input.focus();
        input.select();
      }, 1);
    } else {
      let caduca = 30;
      let nombre = input.value;
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hora = date.getHours();
      let mins = date.getMinutes();
      let seg = date.getSeconds();
      let fecha = `${day}/${month}/${year}`;
      let tiempo = `${hora}:${mins}:${seg}`;
      setCookie('nombre', nombre, caduca);
      setCookie('fecha', fecha, caduca);
      setCookie('hora', tiempo, caduca);
      window.location.href = 'pantalla02.html';
    }
  });
}
function setCookie(nombre, valor, expiracion) {
  var fecha = new Date();
  fecha.setTime(fecha.getTime() + 1000 * 60 * 60 * 24 * expiracion);
  var caduca = 'expires=' + fecha.toUTCString();
  document.cookie =
    nombre + '=' + valor + ';' + caduca + ';path=/;SameSite=Strict';
}
retarda(5000);
