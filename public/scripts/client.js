/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

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
          <p>${content}</p>
        </div>
        <footer>
          <span>${timeago.format(data.created_at)}</span>
          <div>
            <p>${created}</p>
          </div>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
  `);
    return $tweet;
  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".posted-tweets").append($tweet);
    }
  };


  $("form").submit(function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data);
    $.post({
      type: "POST",
      url: "/tweets",
      data: data,
    });
  });

  const loadTweets = function() {
    $.ajax({
      type: "Get",
      url: "/tweets",
      data: "json",
    })
      .then(function (data) {
        renderTweets(data);
      });
  };
  loadTweets();
});