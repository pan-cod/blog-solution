import hyperHTML from 'hyperhtml';
import axios from 'axios-es6';

const container = document.querySelector('.c-container');

function generateArticles(data) {
  const singleParagraphs = data.article.match(/<p>.*?<\/p>/g);

  container.append(hyperHTML.wire()`<article data-id=${data.id}>
  <p>${data.author}</p>
  <h1>${data.title}</h1>
  <img src="${data.imageUrl}">
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
      console.log(articles)
    });
  return articles;
}

const renderArticles = url => {
  getArticles(url).then(item => item.map(a => generateArticles(a)));
};

export default renderArticles;
