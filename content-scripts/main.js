var s = document.createElement("script");
s.src = chrome.runtime.getURL("content-scripts/reddit.js");
s.onload = function () {
  this.remove();
};
console.log(document.head || document.documentElement);
(document.head || document.documentElement).appendChild(s);
