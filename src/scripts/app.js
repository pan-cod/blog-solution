/*
  Project: Blog Solution
  Author: Dariusz Markowicz
 */
import renderPosts from './modules/renderPosts';
import observer from './modules/observer';

let page = 1;
const apiUrl = 'https://stormy-shelf-93141.herokuapp.com/articles';
const target = document.querySelector('.o-layout');
const body = document.querySelector('body');
const aside = document.querySelector('.c-aside');
const heading = document.querySelector('.c-header__heading');
// const uk = document.querySelector('.o-layout');

document.addEventListener('DOMContentLoaded', () => {
  observer.observe(target, { childList: true });

  renderPosts(`${apiUrl}?_page=${page}&_limit=9`);

  heading.addEventListener(
    'click',
    () => {
      body.classList.remove('u-noscroll');
      aside.classList.remove('c-aside--open');
      heading.classList.remove('c-header__heading--clickable');
    },
    false,
  ); // uk.onscroll = (e) => console.log(e);
  window.onscroll = () => {
    const htmlHeight = document.documentElement.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition =
      window.scrollY ||
      window.pageYOffset ||
      document.body.scrollTop +
        ((document.documentElement && document.documentElement.scrollTop) || 0);
    if (htmlHeight <= windowHeight + scrollPosition) {
      page += 1;
      renderPosts(`${apiUrl}?_page=${page}&_limit=9`);
    }
  };
});
