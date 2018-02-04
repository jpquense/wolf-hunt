"use strict";

function renderDom(data) {
	// Rendering methods 
  const articles = data[0];
  const movies = data[1];
  const videos = data[2];
  const books = data[3];

  console.log('renderDom ran')

  const articlesHtml = articles.map(item => `
  	<div>
   <h2>${item.title}</h2>
   <p>${item.desctiption}</p>
   </div>
   `);
  const moviesHtml = articles.map(item => `
    <div>
    <h2>${item.title}</h2>
    <p>${item.desctiption}</p>
    </div>
    `);
  const videosHtml = articles.map(item => `
    <div>
    <h2>${item.title}</h2>
    <p>${item.desctiption}</p>
    </div>
    `);
  const booksHtml = articles.map(item => `
    <div>
    <h2>${item.title}</h2>
    <p>${item.desctiption}</p>
    </div>
    `);

  $('.js-articles').html(articlesHtml);
  $('.js-movies').html(moviesHtml);
  $('.js-videos').html(videosHtml);
  $('.js-books').html(booksHtml);

}

function handleApisResponse(responses) {
	// Manipulte data and update them in desired way
  const data = responses;
  // Call renderind methods
  console.log(responses, data);
  renderDom(data);
  // Hide temporary loader
  $('.js-loader').removeClass('loader');
}

function searchApisFor(searchTerm) {
  console.log(`searchApisFor function was called for "${searchTerm}"`);
  const articleCall = $.ajax({
    method: 'get',
    data: {
      'api-key': '3710cd87703f4791a369cf34c5139e41',
      q: searchTerm,
    },
    url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
  });

  const movieCall = $.ajax({
    method: 'get', 
    url: `http://www.omdbapi.com/?t=${searchTerm}&apikey=2fd347a7`,

  });

  const videoCall = $.ajax({
    method: 'get',
    data: {
      key: 'AIzaSyBBMquy6Vb126Q6C3INBen46s_4TwZEpw0',
      q: `${searchTerm} in:name`,
      part: 'snippet',
      maxResutls: 5
    },
    url: 'https://www.googleapis.com/youtube/v3/search',
  });

  const bookCall = $.ajax({
    method: 'get',
    data: {
      key: 'AIzaSyDGFCGIZUTEwOQ3YCbfdk1kn4ug1ZWXC48',
      q: `${searchTerm} intitle`,
      filter: 'partial',
      maxresutls: 5
    },
    url: 'https://www.googleapis.com/books/v1/volumes',
  });

  console.log('=== running ===');

  Promise.all([articleCall, movieCall, videoCall, bookCall]).then(handleApisResponse);
}

$('.js-form').submit(function(e) {
  console.log('event handler has been called');
  e.preventDefault();
  const searchTarget = $(event.currentTarget).find('#js-input');
  const searchValue = searchTarget.val();
    // clear input
    searchTarget.val("");
    searchApisFor(searchValue);
    $('.js-loader').addClass('loader');
  })