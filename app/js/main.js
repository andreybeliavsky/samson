document.addEventListener('DOMContentLoaded', () => {
  const navButton = document.querySelector('.menu__button');
  const navMenu = document.querySelector('.menu__list');
  const navLink = document.querySelectorAll('.menu__item-link');

  function navToggle() {
    if (navButton.classList.contains('menu__button--active')) {
      navButton.classList.remove('menu__button--active');
    } else {
      navButton.classList.add('menu__button--active');
    }
  }

  navButton.addEventListener('click', (e) => {
    e.preventDefault();
    navMenu.classList.toggle('menu__list--open');
    navToggle();
  });

  navLink.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });

      if (navMenu.classList.contains('menu__list--open')) {
        navToggle();
      }
      navMenu.classList.remove('menu__list--open');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
      navMenu.classList.remove('menu__list--open');
    }
  });
});
