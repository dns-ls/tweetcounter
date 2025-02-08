// Create a new extension
browser.runtime.onInstalled.addListener(() => {
    console.log("Twitter Tweet Counter Extension Installed");
});

// Add a browser action to trigger the addTweetsToSet function
browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.executeScript(tab.id, {
        code: '(' + addTweetsToSet.toString() + ')();(' + displayTweetCount.toString() + ')();'
    });
});
