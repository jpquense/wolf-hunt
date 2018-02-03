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
	const firstCall = $.ajax({
    method: 'get',
    data: {
    	tag: searchTerm,
    },
    url: 'https://relic-idea.glitch.me/first-api',
  });

  const secondCall = $.ajax({
    method: 'get',
    data: {
    	keyword: searchTerm,
    },
    url: 'https://relic-idea.glitch.me/second-api',
  });
  console.log('=== running ===');

  Promise.all([firstCall, secondCall]).then(handleApisResponse);
}

$('.js-search-buttton').click(function(e) {
	e.preventDefault();
  const searchValue = $('.search-input').val();
  searchApisFor(searchValue);
  $('#loader').show();
})