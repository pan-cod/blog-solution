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
const bodyTag = document.querySelector('.js-body');
const asideTag = document.querySelector('.js-aside');
const headingTag = document.querySelector('.js-headline');

renderPostOnClick(config.API_URL, target, renderPost);

renderPosts(`${config.API_URL}?_page=1&_limit=9`);

headingTag.addEventListener(
  'click',
  () => {
    if (asideTag.classList.contains('is-open')) {
      bodyTag.classList.remove('is-noscroll');
      asideTag.classList.remove('is-open');
      headingTag.classList.remove('is-clickable');
      asideTag.removeChild(document.querySelector('.js-article'));
    }
  },
  false,
);

document.addEventListener(
  'scroll',
  rendePostsOnScroll(config.API_URL, renderPosts),
);
