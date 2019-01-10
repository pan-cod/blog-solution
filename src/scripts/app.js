/*
  Project: Blog Solution
  Author: Dariusz Markowicz
 */

import renderArticles from './modules/request';

document.addEventListener('DOMContentLoaded', () => {
  let page = 1;
  const apiUrl = 'https://stormy-shelf-93141.herokuapp.com/articles';
  renderArticles(`${apiUrl}?_page=${page}&_limit=9`);

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
      renderArticles(`${apiUrl}?_page=${page}&_limit=9`);
    }
  };
});
