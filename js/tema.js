const chk = document.getElementById('chk');


function aplicarTemaDark() {
  document.documentElement.classList.add('dark');
  const navbar = document.querySelector('.navbar');
  navbar.classList.remove('navbar-light');
  navbar.classList.add('navbar-dark', 'bg-dark');
  
  const btns = document.querySelectorAll('.btn');
  btns.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-custom');
  });
  
  chk.checked = true;
}

function aplicarTemaLight() {
  document.documentElement.classList.remove('dark');
  const navbar = document.querySelector('.navbar');
  navbar.classList.remove('navbar-dark', 'bg-dark');
  navbar.classList.add('navbar-light');

  const btns = document.querySelectorAll('.btn');
  btns.forEach(btn => {
    btn.classList.remove('btn-custom');
    btn.classList.add('btn-primary');
  });
  
  chk.checked = false;
}

chk.addEventListener('change', () => {
  if (chk.checked) {
    aplicarTemaDark();
    localStorage.setItem('darkMode', 'enabled');
  } else {
    aplicarTemaLight();
    localStorage.setItem('darkMode', 'disabled');
  }
});


window.addEventListener('load', () => {
  if (localStorage.getItem('darkMode') === 'enabled') {
    aplicarTemaDark();
  } else {
    aplicarTemaLight();
  }
});