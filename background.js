// Initialize the blacklist array in chrome.storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('blacklist', (data) => {
    if (!data.blacklist) {
      chrome.storage.sync.set({ blacklist: [] });
    }
  });
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, sender, sendResponse);
  if (request.action === 'checkBlacklist') {
    const currentUrl = sender.tab.url;
    const blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];

    const blacklisted = blacklist.includes(currentUrl);
    sendResponse({ blacklisted }); // send the blacklisted status as a response
  } else if (request.action === 'toggleBlacklist') {
    const currentUrl = sender.tab.url;
    const blacklist = JSON.parse(localStorage.getItem('blacklist')) || [];

    if (blacklist.includes(currentUrl)) {
      // Remove the current page from the blacklist
      const index = blacklist.indexOf(currentUrl);
      blacklist.splice(index, 1);
    } else {
      // Add the current page to the blacklist
      blacklist.push(currentUrl);
    }

    localStorage.setItem('blacklist', JSON.stringify(blacklist));
    sendResponse({ success: true }); // send a success response
  }

  return true; // indicate that a response will be sent asynchronously
});
