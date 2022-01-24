export default function navigationToggle () {
  const menu = document.getElementById('header-menu')
  const navToggler = document.getElementById('nav-toggler')
  navToggler.onclick = function () {
    if (menu.style.display === 'flex') {
      menu.style.display = 'none'
      document.body.classList.remove('menu-open')
    } else {
      menu.style.display = 'flex'
      document.body.classList.add('menu-open')
    }
  }
}
