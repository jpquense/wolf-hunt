"use strict";

function renderVideoResults(videos) {
  return `
    <div class="video-result">
    <h3>${videos.snippet.title}</h3>
    <a data-videoTitle="${videos.snippet.title}" data-videoId="${videos.id.videoId}" class="js-modal" href="https://www.youtube.com/watch?v=${videos.id.videoId}" target="_blank">
    <img src="${videos.snippet.thumbnails.medium.url}" alt="${videos.snippet.title}">
    <a>
    </div>
  `;
}

function renderBookResults(books) {
  return `
    <div class="book-result">
    <a href="${books.volumeInfo.infoLink}" target="_blank">
    <h3>${books.volumeInfo.title}</h3>
    </a>
    <h5>${books.volumeInfo.authors ? books.volumeInfo.authors : 'No author defined'}</h5>

    </div>
  `;
}

function renderDom(data) {
	// Rendering methods 
  const videoResults = data[0].items.map((item, index) => renderVideoResults(item));
  const bookResults = data[1].items.map((item, index) => renderBookResults(item));

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
  
  // Hide temporary loader
  $('.js-loader').removeClass('loader');
  $('.js-message').html('<p>success!!</p>')
}

function searchApisFor(searchTerm) {
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
      maxResults: 12
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

$('.js-results').on('click', '.js-modal', function(e) {
  e.preventDefault();
  const videoId = $(e.currentTarget).attr('data-videoId');
  const videoTitle = $(e.currentTarget).attr('data-videoTitle');

  $('.modal-header h2').text(videoTitle);
  $('.modal-body').html(`<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`)

  $('#myModal').show();
});

$('.close').on('click', function() {
 $('#myModal').hide();
$('.modal-body').html('');
})