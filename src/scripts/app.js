/*
  Project: Blog Solution
  Author: Dariusz Markowicz
 */

import hyperHTML from 'hyperhtml';
import axios from 'axios-es6';

const container = document.querySelector('.c-container');

function generateArticles(data) {
  container.append(hyperHTML.wire()`<article data-id=${data.id}>
  <p>${data.author}</p>
  <h1>${data.title}</h1>
  <img src="${data.imageUrl}">
  ${data.article.split('"')}
  </article>`);
}

async function getArticles(url) {
  let articles = {};
  await axios.get(url).then(res => {
    articles = res.data;
  });
  return articles;
}

const renderArticles = url => {
  getArticles(url).then(item => item.map(a => generateArticles(a)));
};

renderArticles('https://stormy-shelf-93141.herokuapp.com/articles');
