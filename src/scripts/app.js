/*
  Project: Blog Solution
  Author: Dariusz Markowicz
 */

import renderPosts from './modules/renderPosts';
import observer from './modules/observer';

document.addEventListener('DOMContentLoaded', () => {
  let page = 1;
  const apiUrl = 'https://stormy-shelf-93141.herokuapp.com/articles';
  renderPosts(`${apiUrl}?_page=${page}&_limit=9`);
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

  const target = document.querySelector('.o-layout');
  observer.observe(target, { childList: true });

  document.querySelector('.c-header__heading').addEventListener(
    'click',
    () => {
      document.querySelector('.c-aside').className = 'c-aside';
      document.querySelector('.c-header__heading').className =
        'c-header__heading';
    },
    false,
  );
});
