import { debounce, getDistanceToBottom } from '../lib/lib';

function rendePostsOnScroll(api, fn) {
  let page = 1;

  return debounce(() => {
    const distanceToBottom = getDistanceToBottom();
    if (distanceToBottom === 0) {
      page += 1;
      fn(`${api}?_page=${page}&_limit=9`);
    }
  }, 150);
}

export default rendePostsOnScroll;
