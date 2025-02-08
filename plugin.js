// crc function for hashing tweets to check for duplicates
function crc32(str) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < str.length; i++) {
        let byte = str.charCodeAt(i);
        crc ^= byte;
        for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
        }
    }
    return (crc ^ 0xFFFFFFFF) >>> 0; // Unsigned 32-bit integer
}

// Set to store unique tweets
const tweetSet = new Set();

function crcTweets(tweets) {
    const crcs = new Set();
    tweets.forEach(tweet => crcs.add(crc32(tweet)));
    return crcs;
}

// get the tweets
function getTweets() {
    const rawTweets = document.querySelectorAll('time');
    const tweetAttr = new Set();
    rawTweets.forEach(tweet => tweetAttr.add(tweet.getAttribute("datetime")));
    return tweetAttr;
}

// Function to add tweets to the set and display the total count
function addTweetsToSet(tweets) {
    tweets.forEach(id => tweetSet.add(id));
    // console.log('Tweets added to set');
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
    var a = new Set()
    a = getTweets();
    a = crcTweets(a);
    addTweetsToSet(a)
    displayTweetCount(); 
    if (tweetSet.size > 200) {
        alert("You have reached 200 tweets. Go touch some grass.");
    }
}, 1500);


// todo: permament storage of tweets count