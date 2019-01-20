import renderPosts from './renderPosts';
// debounce func inspired from here https://medium.com/@TCAS3/debounce-deep-dive-javascript-es6-e6f8d983b7a1

let page = 1;
const apiUrl = 'https://stormy-shelf-93141.herokuapp.com/articles';

const debounce = (fn, time) => {
  let timeout;

  return function(...args) {
    const functionCall = () => fn.apply(this, args);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

function getDistanceToBottom() {
  const scrollPosition =
    window.scrollY || window.pageYOffset || document.body.scrollTop;
  const windowSize = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;
  return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
}

const handleScroll = debounce(() => {
  const distanceToBottom = getDistanceToBottom();
  if (distanceToBottom === 0) {
    page += 1;
    renderPosts(`${apiUrl}?_page=${page}&_limit=9`);
  }
}, 150);

export default handleScroll;
