import axios from 'axios-es6';
import hyperHTML from 'hyperhtml';

// for sorting posts from Api use this method at 10 line: res.data.sort((a, b) => new Date(b.date) - new Date(a.date))

async function getPosts(url) {
  let articles = {};
  await axios
    .get(url)
    .then(res => res.data)
    .then(json => {
      articles = json;
    });
  return articles;
}

function generatePosts(data, i) {
  const posts = document.querySelector('.o-layout');
  const singleParagraphs = data.article.match(/<p>.*?<\/p>/g);
  const endOftitle = data.title.indexOf('.');
  const forceUnique = `${data.imageUrl}?sig=${Math.floor(Math.random() * 123)}`;
  const temp = 1 + i;
  const generatedPost = hyperHTML.wire()`<li class="o-layout__item c-post" data-id=${
    data.id
  }>
    <img class="${temp % 3 === 0 ? 'c-post__img' : null}" src="${forceUnique}">
    <div class="${
      temp % 3 === 0
        ? 'c-post__preview c-post__preview--big'
        : 'c-post__preview'
    }">
      <p>${data.author}</p>
      <h1 class="c-post__title">${data.title.substring(0, endOftitle)}</h1>
      <div class="c-post__text">
      ${singleParagraphs[0].split('')}
      </div>
      <i class="c-btn">
        <svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.024 0H16.039L24 8L16.039 16H10.024L17.985 8L10.024 0ZM0 16H6.015L13.976 8L6.015 0H0L7.961 8L0 16H0Z" fill="#032937"/>
        </svg>
      </i>
    </div>
  </li>`;
  posts.appendChild(generatedPost);
}

const renderPosts = url => {
  getPosts(url).then(item => item.map((el, i) => generatePosts(el, i)));
};

export default renderPosts;
