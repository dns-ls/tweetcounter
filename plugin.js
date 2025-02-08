// plugin.js

// Function to count tweets
// function countTweets() {
//     const tweets = document.querySelectorAll('article');
//     alert(`Number of tweets on this page: ${tweets.length}`);
// }

// // Run the countTweets function when the content script is loaded
// countTweets();

// Set to store unique tweets
const tweetSet = new Set();

// Function to add tweets to the set and display the total count
function addTweetsToSet() {
    const tweets = document.querySelectorAll('article');
    tweets.forEach(tweet => tweetSet.add(tweet.innerText));
    displayTweetCount();
}

// Function to display the total tweet count on the side of the screen
function displayTweetCount() {
    let tweetCountDiv = document.getElementById('tweet-count');
    if (!tweetCountDiv) {
        tweetCountDiv = document.createElement('div');
        tweetCountDiv.id = 'tweet-count';
        tweetCountDiv.style.position = 'fixed';
        tweetCountDiv.style.top = '10px';
        tweetCountDiv.style.right = '10px';
        tweetCountDiv.style.backgroundColor = 'white';
        tweetCountDiv.style.border = '10px solid red';
        tweetCountDiv.style.padding = '10px';
        tweetCountDiv.style.color = 'red';
        document.body.appendChild(tweetCountDiv);
        console.log('Tweet count div created');
    }
    tweetCountDiv.innerText = "Total unique tweets: " + tweetSet.size;
}

setInterval(() => {
    addTweetsToSet();
    displayTweetCount();
}, 5000);

//fix shit, tweets nach id speichern