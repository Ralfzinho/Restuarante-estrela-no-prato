const chk = document.getElementById('chk')

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark')

    const navbar = document.querySelector('.navbar')

    if (document.body.classList.contains('dark')) {
        navbar.classList.remove('navbar-light')
        navbar.classList.add('navbar-dark', 'bg-dark')
    } else {
        navbar.classList.remove('navbar-dark', 'bg-dark')
        navbar.classList.add('navbar-light')
    }
})