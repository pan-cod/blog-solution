import { debounce, getDistanceToBottom } from '../lib/lib';

function rendePostsOnScroll(API_URL, fn) {
  let page = 1;

  return debounce(() => {
    const distanceToBottom = getDistanceToBottom();
    if (distanceToBottom === 0) {
      page += 1;
      fn(`${API_URL}?_page=${page}&_limit=9`);
    }
  }, 150);
}

export default rendePostsOnScroll;
