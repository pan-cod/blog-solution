import axios from 'axios-es6';

const aside = document.querySelector('.c-aside');

async function getSinglePost(url) {
  let article = {};
  await axios
    .get(url)
    .then(res => res.data)
    .then(json => {
      article = json;
    });
  return article;
}

function showArticle(data) {
  const singleParagraphs = data.article.match(/<p>.*?<\/p>/g);
  const endOftitle = data.title.indexOf('.');
  const forceUnique = `${data.imageUrl}?sig=${Math.floor(Math.random() * 123)}`;
  const date = new Date(data.date).toDateString().split(' ');
  const article = `<article class="c-article" data-id=${data.id}>
   <div class="c-article__inner o-layout o-layout--2">
      <div class="o-layout__item">
      <img class="c-article__img" src="${forceUnique}">
      </div>
      <div class="o-layout__item">
        <div class="c-article__desc">
          <p class="c-article__desc-date">${date[1]} ${date[2]}, ${date[3]}</p>
          <p>${data.author}</p>
          <h1 class="c-post__title">${data.title.substring(0, endOftitle)}</h1>
        </div>
      </div>
      <div class="c-article__text">
      ${singleParagraphs.join('')}
      </div>
   </div>

  </article>`;
  aside.innerHTML = article;
  document.querySelector('.c-aside').className += ' c-aside--open';
  document.querySelector('.c-header__heading').className +=
    ' c-header__heading--clickable';
}

const showSingleArticle = (url, id) => {
  getSinglePost(url, id).then(item =>
    item.filter(el => el.id === id).map(el => showArticle(el)),
  );
};

/* The following solution was adapted from https://davidwalsh.name/mutationobserver-api */
const apiUrl = 'https://stormy-shelf-93141.herokuapp.com/articles';

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const el = mutation.addedNodes[0];
    el.addEventListener(
      'click',
      e => {
        const postID = e.currentTarget.getAttribute('data-id');
        showSingleArticle(apiUrl, postID);
      },
      false,
    );
    // observer.disconnect();
  });
});

export default observer;
