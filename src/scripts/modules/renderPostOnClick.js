// Using observer was adapted from https://davidwalsh.name/mutationobserver-api
// Just adding click event listener for every dynamically added post on blog page

function renderPostOnClick(API_URL, target, fn) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const el = mutation.addedNodes[0];
      el.addEventListener(
        'click',
        e => {
          const postID = e.currentTarget.getAttribute('data-id');
          fn(API_URL, postID);
        },
        false,
      );
    });
  });
  return observer.observe(target, { childList: true });
}

export default renderPostOnClick;
