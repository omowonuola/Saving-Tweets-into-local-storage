// Variables 
const tweetlist = document.getElementById('tweet-list');


// Event Listeners 
eventListeners();
function eventListeners() {
    // Form Submission
    document.querySelector('#form').addEventListener('submit', newTweet);


    // Remove tweet from the list
    tweetlist.addEventListener('click', removeTweet);

    // Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}


// Functions
function newTweet(e) {
    e.preventDefault();


// Read the textarea value
    const tweet = document.getElementById('tweet').value;

// create the remove button 
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

// create an <li> element
    const li = document.createElement('li');
    li.textContent = tweet;

// Add remove button to each tweet
    li.appendChild(removeBtn);

// Add to the list
    tweetlist.appendChild(li);


// Add to local storage
    addTweetLocalStorage(tweet)

// Print the alert
    alert('Tweet Added');
    this.reset();
}

// Remove tweet from the DOM
function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    // Remove from Storage
    removeTweetLocalStorage(e.target.parentElement.textContent);
}

// Add the tweet into the local storage
function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();


    // Add the tweet into the array
    tweets.push(tweet);

    // convert tweet array into string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

    function getTweetsFromStorage() {
        let tweets;
        const tweetsLS = localStorage.getItem('tweets');
        
    // Get the values, if null is returned then we create an empty array
    if(tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    } 
    return tweets;
}

// prints local storage tweets on load
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();

    // Loop through storage and then print the values
    tweets.forEach(function(tweet) {
        // create the remove button 
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        // create an <li> element
        const li = document.createElement('li');
        li.textContent = tweet;

        // Add remove button to each tweet
        li.appendChild(removeBtn);

        // Add to the list
        tweetlist.appendChild(li);
    });
}

// Remove the tweet from local storage
function removeTweetLocalStorage(tweet) {

    // Get tweets from Storage
    let tweets = getTweetsFromStorage();

    // Remove the X from the tweet
    const tweetDelete = tweet.substring(0, tweet.length-1);

    // Loop through the tweets and remove the tweet that's equal
    tweets.forEach(function(tweetLS, index) {
        if(tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });

    // Save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
