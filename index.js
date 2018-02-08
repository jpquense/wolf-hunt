"use strict";

function renderModal(title, href) {
  console.log('renderModal ran');
  modal.style.display = "block";
}
// function renderArticleResults(articles) {
//   console.log(articles)
//   console.log(articles.headline.kicker);
//   return `
//     <div>
//       <h3>${articles.headline.kicker}</h3>
//       <a href="${articles.web_url}" target="_blank">
//         <h4>${articles.headline.main}</h4>
//         </a>
//       <h5>${articles.byline.original}</h5>
//       <p>${articles.snippet}</p>
//     </div>
//   `;
// }

function renderVideoResults(videos) {
  return `
    <div>
      <h3>${videos.snippet.title}</h3>
      <a class="js-modal" href="https://www.youtube.com/watch?v=${videos.id.videoId}" target="_blank">
        <img src="${videos.snippet.thumbnails.medium.url}" alt="${videos.snippet.title}">
      <a>
    </div>
  `;
}

function renderBookResults(books) {
  return `
    <div>
      <a href="${books.volumeInfo.infoLink}" target="_blank">
        <h3>${books.volumeInfo.title}</h3>
        </a>
      <h5>${books.volumeInfo.authors}</h5>
      
    </div>
  `;
}
// <p>${books.volumeInfo.description}</p>
function renderDom(data) {
	// Rendering methods 
  const videoResults = data[0].items.map((item, index) => renderVideoResults(item));
  const bookResults = data[1].items.map((item, index) => renderBookResults(item));
  // const articleResults = data[2].response.docs.map((item, index) => renderArticleResults(item));

  // $('.js-articles').html(articleResults);
  // $('.js-movies').html(moviesHtml);
  $('.js-videos').html(videoResults);
  $('.js-books').html(bookResults);

}

function handleError() {
  $('.js-loader').removeClass('loader');
  $('.js-message').html('<p>sorry it seems our data base is down right now... try again!!</p>')
}

function handleApisResponse(responses) {
  // Call renderind methods
  renderDom(responses);
  renderModal(responses);
  // Hide temporary loader
  $('.js-loader').removeClass('loader');
  $('.js-message').html('<p>we feast!!</p>')
}

function searchApisFor(searchTerm) {
  // const articleCall = $.ajax({
  //   method: 'get',
  //   data: {
  //     'api-key': '3710cd87703f4791a369cf34c5139e41',
  //     q: searchTerm,
  //   },
  //   url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
  // });

  // const movieCall = $.ajax({
  //   method: 'get', 
  //   url: `http://www.omdbapi.com/?t=${searchTerm}&apikey=2fd347a7`,

  // });

  const videoCall = $.ajax({
    method: 'get',
    data: {
      key: 'AIzaSyBBMquy6Vb126Q6C3INBen46s_4TwZEpw0',
      q: `${searchTerm} in:name`,
      part: 'snippet',
      maxResutls: 7
    },
    url: 'https://www.googleapis.com/youtube/v3/search',
  });

  const bookCall = $.ajax({
    method: 'get',
    data: {
      key: 'AIzaSyDGFCGIZUTEwOQ3YCbfdk1kn4ug1ZWXC48',
      q: `${searchTerm} :subject`,
      filter: 'partial',
      printType: 'all',
      maxresutls: 7
    },
    url: 'https://www.googleapis.com/books/v1/volumes',
  });

  console.log('=== running ===');

  Promise.all([videoCall, bookCall]).then(handleApisResponse).catch(handleError);
}

$('.js-form').submit(function(e) {
  e.preventDefault();
  const searchTarget = $(event.currentTarget).find('#js-input');
  const searchValue = searchTarget.val();
    // clear input
    searchTarget.val("");
    searchApisFor(searchValue);
    $('.js-message').html('<p>the pack is off running!<hr> Your seach will be caught shortly!</p>');
    $('.js-loader').addClass('loader');
  })

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

$('.js-results').on('click', '.js-modal', function(e) {
  
  e.preventDefault();
  console.log('href function ran');
  const href = $(event.currentTarget).find('a').attr('href');
  const title = $(event.currentTarget).find('h3').val();

  console.log(title, Href);

  renderModal(title, Href) 
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}