import axios from 'axios-es6';

export function debounce(fn, time) {
  let timeout;

  return function(...args) {
    const functionCall = () => fn.apply(this, args);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}

export function getDistanceToBottom() {
  const scrollPosition =
    window.scrollY || window.pageYOffset || document.body.scrollTop;
  const windowSize = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;
  return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
}

// for sorting posts from Api use this method at 10 line: res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
export function getPosts(url) {
  const article = axios
    .get(url)
    .then(res => res.data)
    .catch(error => {
      console.log(error);
    });
  return article;
}

export default { debounce, getDistanceToBottom, getPosts };
