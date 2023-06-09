chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'enable') {
    modifyAllTextNodes(document.body);
    sendResponse({status: true})
  } else if (request.command === 'disable') {
    restoreOriginalBody();
    sendResponse({status: true})
  }
  return true;
})

const originalBody = document.body.cloneNode(true);

function restoreOriginalBody() {
  document.body.parentNode.replaceChild(originalBody, document.body);
}

function modifyTextNode(node) {
  const text = node.nodeValue;
  const words = text.split(' ');

  // Loop through each word and modify it
  const modifiedWords = words.map(word => {
    const halfLength = Math.ceil(word.length / 2);
    const boldedChars = word.slice(0, halfLength);
    const regularChars = word.slice(halfLength);
    return `<b>${boldedChars}</b>${regularChars}`;
  });

  // Join the modified words back into a string
  const modifiedText = modifiedWords.join(' ');

  // Create a new span element with the modified text
  const span = document.createElement('span');
  span.innerHTML = modifiedText;

  // Replace the original text node with the new span element
  node.parentNode.replaceChild(span, node);
}
function modifyAllTextNodes(node) {
  // Recursively traverse the DOM tree
  if (node.nodeType === Node.TEXT_NODE) {
    modifyTextNode(node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    node.childNodes.forEach(childNode => modifyAllTextNodes(childNode));
  }
}

