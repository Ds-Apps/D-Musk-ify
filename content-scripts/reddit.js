requestIdleCallback(() => {
  console.log("initial idle");
  findAndReplaceDOMEls();
});

const optOutWord = "musk";

let oldXHROpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function (
  method,
  url,
  async,
  user,
  password
) {
  //   url === "https://gql.reddit.com" &&
  // this.addEventListener("readystatechange", function (event) {
  //   if (this.readyState === 4) {
  //     var response = "fffffff"; // callback(event.target.responseText);
  //     Object.defineProperty(this, "response", {
  //       value: "fffff",
  //       writable: true,
  //     });
  //     Object.defineProperty(this, "responseText", {
  //       value: "fffff",
  //       writable: true,
  //     });
  //     this.response = this.responseText = response;
  //     console.log({ rsp: this.response });
  //   }
  // });

  this.addEventListener("load", function () {
    console.log({ url });
    // GATEWAY.REDDIT is not XHR... maybe fetch???? <<<<<<<<
    // if (
    //   url === "https://gql.reddit.com" ||
    //   url === "https://gateway.reddit.com"
    // ) {
    findAndReplaceDOMEls();
    // TODO: would be even better if we could filter musk responses in the request body before it reaches the dom
    // https://stackoverflow.com/questions/26447335/how-can-i-modify-the-xmlhttprequest-responsetext-received-by-another-function
    // var original_response, modified_response;

    // original_response = this.responseText;
    // Object.defineProperty(this, "responseText", { writable: true });
    // Object.defineProperty(this, "response", { writable: true });
    // modified_response = findAndReplaceJSON(JSON.parse(original_response));
    // // modified_response.htmlinfo = "woops! All data has gone!";
    // console.log({ modified_response });
    // this.responseText = JSON.stringify(modified_response);
    // this.response = modified_response;

    // console.log({
    //   resposeText: this.responseText,
    //   response: this.response,
    // });
    // }
  });

  return oldXHROpen.apply(this, arguments);
};

// const findAndReplaceJSON = ({ data, ...stuff }) => {
//   const copiedData = Object.assign({}, data);

//   console.log({ stuff });

//   // Search
//   if (Array.isArray(data?.search?.general?.posts?.edges)) {
//     copiedData.search.general.posts.edges =
//       data.search.general.posts.edges.filter(
//         ({ node }) => !node.title?.toLowerCase().includes(optOutWord)
//       );

//     console.log(
//       copiedData.search.general.posts.edges.length,
//       data.search.general.posts.edges.length
//     );
//   }

//   // Feed
//   if (Array.isArray(data?.home?.elements?.edges)) {
//     copiedData.home.elements.edges = data.home.elements.edges.filter(
//       ({ node }) => !node.title?.toLowerCase().includes(optOutWord)
//     );

//     console.log(
//       copiedData.home.elements.edges.length,
//       data.home.elements.edges.length
//     );
//   }

//   if (Array.isArray(data?.trendingSubreddits)) {
//     copiedData.trendingSubreddits = data.trendingSubreddits.filter(
//       ({ title }) => !title?.toLowerCase().includes(optOutWord)
//     );

//     console.log(
//       copiedData.trendingSubreddits.length,
//       data.trendingSubreddits.length
//     );
//   }

//   return copiedData;
// };

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
