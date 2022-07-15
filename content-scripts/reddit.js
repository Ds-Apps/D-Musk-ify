requestIdleCallback(() => {
  console.log("initial idle");
  findAndReplaceDOMEls();
});

const optOutWord = "musk";

let oldXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (method, url) {
  this.addEventListener("load", function () {
    findAndReplaceDOMEls();
  });

  return oldXHROpen.apply(this, arguments);
};

const findAndReplaceDOMEls = () => {
  console.log("FINDING AND REPLACING");
  const els = document.querySelectorAll('[data-testid="post-container"]');
  els.forEach((el) => {
    if (el.innerText?.toLowerCase().includes(optOutWord)) {
      el.style.display = "none";
      console.log("Hiding musk", el.innerText);
    }
  });
};
