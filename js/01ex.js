function isKeyPressed(event) {
  //Concatene  en un and una polsació de la tecla alt i una polsació de la tecla F12 que equival al codi 123
  if (event.ctrlKey && event.keyCode == 121) {
    if (document.querySelector('input') == null) {
      creaH1('Usuario');
      creaInput();

      console.log('cntrl+f10');
    }
  }
}

//document.addEventListener('keyup', isKeyPressed);
document.addEventListener('keydown', isKeyPressed);
function retarda(temps) {
  var dobleTemps = temps * 2;
  var seg = temps / 1000;
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
  input.focus();
  input.addEventListener('blur', function (ev) {
    let exp = /^[^@]+@[^@]+\.[a-zA-Z0-9_]{2,}$/;
    if (exp.test(input.value) == false) {
      ev.preventDefault();
      document.getElementById('info').innerHTML =
        '<p>Error: Correo no válido</p>';
      // TO-DO no recupera el foco.
      console.log('prefocus');

      input.select();
      input.focus();
      console.log('postfocus');
    } else {
      console.log('cambia');
      window.location.href = 'pantalla02.html';
    }
  });
}

retarda(5000);
