/*
  Project: Blog Solution
  Author: Dariusz Markowicz
 */
import renderPosts from './modules/renderPosts';
import observer from './modules/observer';
import handleScroll from './modules/handleScroll';

document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://stormy-shelf-93141.herokuapp.com/articles';
  const target = document.querySelector('.o-layout');
  const body = document.querySelector('body');
  const aside = document.querySelector('.c-aside');
  const heading = document.querySelector('.c-header__headline');

  observer.observe(target, { childList: true });

  renderPosts(`${apiUrl}?_page=1&_limit=9`);

  heading.addEventListener(
    'click',
    () => {
      body.classList.remove('u-noscroll');
      aside.classList.remove('c-aside--open');
      heading.classList.remove('c-header__headline--clickable');
    },
    false,
  );

  document.addEventListener('scroll', handleScroll);
});
