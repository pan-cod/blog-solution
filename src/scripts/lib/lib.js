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

export default { debounce, getDistanceToBottom };
