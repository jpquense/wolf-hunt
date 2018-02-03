function normalizeData(data) {
	// Data manipulation
  const normalizedData = data;
  return normalizedData;
}

function renderDom(data) {
	// Redenring methods
  const html = data.map(item => `
  	<div>
    	<h2>${item.title}</h2>
      <p>${item.desctiption}</p>
    </div>
  `);
  $('#app').html(html);
}

function handleApisResponse(responses) {
	// Manipulte data and update them in desired way
  const data = normalizeData(responses);
  // Call renderind methods
  renderReponses(data);
  // Hide temporary loader
	  $('#loader').show();
}

function searchApisFor(searchTerm) {
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
    data: {
      r: json,
      plot: short
    }, 
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

$('.js-search').click(function(e) {
	e.preventDefault();
  const searchValue = $('.search-input').val();
  searchApisFor(searchValue);
  $('#loader').show();
})