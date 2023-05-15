// Get the button element from the popup DOM
const button = document.getElementById('blacklist-button');

button.addEventListener('click', function (){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    // Send a message to the background script to check if the current page is blacklisted
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id,{ command: 'enable' }, (response) => {
      if (response.status) {
        button.textContent = 'enabled';
      } else {
        button.textContent = 'enable';
      }
    });
  })
});
