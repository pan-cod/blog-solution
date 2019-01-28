import { getPosts } from '../lib/lib';

function showArticle(data) {
  const bodyTag = document.querySelector('.js-body');
  const asideTag = document.querySelector('.js-aside');
  const headingTag = document.querySelector('.js-headline');
  const singleParagraphs = data.article.match(/<p>.*?<\/p>/g);
  const endOftitle = data.title.indexOf('.');
  const forceUnique = `${data.imageUrl}?sig=${Math.floor(Math.random() * 123)}`;
  const date = new Date(data.date).toDateString().split(' ');

  const article = `<article class="c-article js-article">
  <div class="c-article__overlay">
    <div class="c-article__inner o-layout o-layout--2">
      <div class="o-layout__item">
      <img class="c-article__img" src="${forceUnique}">
      </div>
      <div class="o-layout__item">
        <div class="c-article__desc">
          <p class="c-article__desc-date">${date[1]} ${date[2]}, ${date[3]}</p>
          <p class="c-article__desc-author">${data.author}</p>
          <h1 class="c-post__title">${data.title.substring(0, endOftitle)}</h1>
        </div>
      </div>
      <div class="c-article__text">
      ${singleParagraphs}
      </div>
   </div>
  </div>
  </article>`;

  asideTag.innerHTML = article;
  bodyTag.classList.add('is-noscroll');
  asideTag.classList.add('is-open');
  headingTag.classList.add('is-clickable');
}

const renderPost = (url, id) => {
  getPosts(url, id).then(item =>
    item.filter(el => el.id === id).map(el => showArticle(el)),
  );
};

export default renderPost;
