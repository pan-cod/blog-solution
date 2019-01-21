/*
  Project: Blog Solution
  Author: Dariusz Markowicz
 */
import renderPosts from './modules/renderPosts';
import rendePostsOnScroll from './modules/renderPostsOnScroll';
import renderPost from './modules/renderPost';
import renderPostOnClick from './modules/renderPostOnClick';
import config from './config/config';

const target = document.querySelector('.js-list');
const body = document.querySelector('.js-body');
const aside = document.querySelector('.js-aside');
const heading = document.querySelector('.js-headline');

renderPostOnClick(config.API_URL, target, renderPost);

renderPosts(`${config.API_URL}?_page=1&_limit=9`);

heading.addEventListener(
  'click',
  () => {
    if (aside.classList.contains('is-open')) {
      body.classList.remove('is-noscroll');
      aside.classList.remove('is-open');
      heading.classList.remove('is-clickable');
      aside.removeChild(document.querySelector('.js-article'));
    }
  },
  false,
);

document.addEventListener(
  'scroll',
  rendePostsOnScroll(config.API_URL, renderPosts),
);
