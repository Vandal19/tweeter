/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
// Function to create new tweet html //
  const createTweetElement = function(data) {
    const { name, avatars, handle } = data.user;
    const content = data.content.text;
    const created = data.created_at;

    const $tweet = $(`
  <article class ="tweets"> 
        <header>
          <div>
            <img src="${avatars}">
            <h2>${name}</h2>
          </div>
          <p>${handle}</p>
        </header>
        <div class = "tweet">
          <p>${escape(content)}</p>
        </div>
        <footer>
          <span>${timeago.format(created)}</span>
          <div>
          </div>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
          </div>
        </footer>
      </article>
  `);
    return $tweet;
  };

  // Escape Function to prevent XSS with Escaping //
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

// Function to loop through tweets, call createTweetElements with prepend the return value to the posted tweets//
  const renderTweets = function(tweets) {
    $(".posted-tweets").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".posted-tweets").prepend($tweet);
    }
  };

// Implement form validation to ensure data check before sending a POST request to /tweets using Ajax along with some slideUp/Down animation//
  $("form").submit(function(event) {
    event.preventDefault();
    if (!$('#tweet-text').val().trim()) {
      $('.invalid').text(`Please type in something, you can't post an empty tweet!`).hide().slideDown("slow");
    } else if ($('#tweet-text').val().length > 140) {
      $('.invalid').text('Your tweet is over the 140 characters limit, please create a new tweet to continue on!');
      $('.invalid').hide().slideDown("slow");
    } else {
      $('.invalid').slideUp();
      const data = $(this).serialize();
      $.post({
        type: "POST",
        url: "/tweets",
        data: data,
      })
        .then(function() {
          $("form").trigger("reset");
        })
        .then(function() {
          loadTweets();
        });
    }
  });

// Use Get request to load the tweet that was just posted to /tweets using Ajax//
  const loadTweets = function() {
    $.ajax({
      type: "Get",
      url: "/tweets",
      data: "json",
    })
      .then(function(data) {
        renderTweets(data);
      });
  };
  loadTweets();
});