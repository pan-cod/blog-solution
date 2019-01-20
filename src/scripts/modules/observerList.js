import renderPost from './renderPost';
// Using observer was adapted from https://davidwalsh.name/mutationobserver-api
// Just adding click event listener for every dynamically added post in blog page

const apiUrl = 'https://stormy-shelf-93141.herokuapp.com/articles';

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const el = mutation.addedNodes[0];
    el.addEventListener(
      'click',
      e => {
        const postID = e.currentTarget.getAttribute('data-id');
        renderPost(apiUrl, postID);
      },
      false,
    );
  });
});

export default observer;
