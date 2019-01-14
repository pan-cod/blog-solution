import hyperHTML from 'hyperhtml';
import axios from 'axios-es6';

const container = document.querySelector('.c-section');

function generateArticles(data) {
  const singleParagraphs = data.article.match(/<p>.*?<\/p>/g);
  const endOftitle = data.title.indexOf('.');
  const forceUnique = `${data.imageUrl}?sig=${Math.floor(
    Math.random() * 1000,
  )}`;

  container.append(hyperHTML.wire()`<article data-id=${data.id}>
  <p>${data.author}</p>
  <h1>${data.title.substring(0, endOftitle + 1)}</h1>
  <img src="${forceUnique}">
  ${singleParagraphs[0].split('')}
  </article>`);
}

async function getArticles(url) {
  let articles = {};
  await axios
    .get(url)
    .then(res => res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
    .then(json => {
      articles = json;
    });
  return articles;
}

const renderArticles = url => {
  getArticles(url).then(item => item.map(a => generateArticles(a)));
};

export default renderArticles;
