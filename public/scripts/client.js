/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1652826970190
    }
  ];

  const createTweetElement = function (data) {
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

  renderTweets(data);


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

});