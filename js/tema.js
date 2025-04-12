const chk = document.getElementById('chk');

// Funções para aplicar os temas
function aplicarTemaDark() {
  document.documentElement.classList.add('dark'); // html
  const navbar = document.querySelector('.navbar');
  navbar.classList.remove('navbar-light');
  navbar.classList.add('navbar-dark', 'bg-dark');
  chk.checked = true;
}

function aplicarTemaLight() {
  document.documentElement.classList.remove('dark'); // html
  const navbar = document.querySelector('.navbar');
  navbar.classList.remove('navbar-dark', 'bg-dark');
  navbar.classList.add('navbar-light');
  chk.checked = false;
}

// Evento de mudança do checkbox para alternar o tema e salvar a preferência
chk.addEventListener('change', () => {
  if (chk.checked) {
    aplicarTemaDark();
    localStorage.setItem('darkMode', 'enabled');
  } else {
    aplicarTemaLight();
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Caso queira, uma confirmação adicional ao carregar a página (mas o script inline já cuidou disso)
window.addEventListener('load', () => {
  if (localStorage.getItem('darkMode') === 'enabled') {
    aplicarTemaDark();
  } else {
    aplicarTemaLight();
  }
});