// Get the button element from the popup DOM
const enableButton = document.getElementById('enable-button');
const disableButton = document.getElementById('disable-button');

enableButton.addEventListener('click', function (){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    // Send a message to the background script to check if the current page is blacklisted
    const activeTab = tabs[0];
    console.log('activeTab',activeTab)
    chrome.tabs.sendMessage(activeTab.id,{ command: 'enable'},()=>{});
  })
});

disableButton.addEventListener('click', function (){
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    // Send a message to the background script to check if the current page is blacklisted
    const activeTab = tabs[0];
    console.log('activeTab',activeTab)
    chrome.tabs.sendMessage(activeTab.id,{ command: 'disable'},()=>{});
  })
});
