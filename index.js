/**
 * Albert Wang
 * 5/19/23
 * CSE 154 AG
 * Allison Ho & Tara Wueger
 * This is the JS file to implement the UI of my index html file. It generates
 * pictures according with my favorites theme and change font style while users
 * switch modes by pressing matched buttons. It also provides the audiences with a fun
 * chance to interact with the page for my personal information associated with
 * career, achievements, and etc.
 *
 */
'use strict';
(function() {
  window.addEventListener("load", init);

  /**
   * Sets up functioning buttons on screen when page loads.
   */
  function init() {
    let button = document.querySelector('#favorites');
    button.addEventListener('click', pictureSwitch);
    let toggleButton = document.querySelector('#toggle-button');
    toggleButton.addEventListener('click', modeSwitch);
    document.getElementById('personal-intro').addEventListener("click", () => {
      let type = document.getElementById('intro-type').value;
      let index = document.getElementById('personal-intro-option-index').value || 0;
      jsonFetchRequest('/question/' + type + '/' + index);
    });
    document.getElementById('resume').addEventListener("click", () => {
      let part = document.getElementById('resume-type').value || 0;
      textFetchRequest('/resume/' + part);
    });
  }

  /**
   * This function allows users to switch to another random pictures from my favorites
   * content every time they press the button.
   */
  function pictureSwitch() {
    const urls = ['https://upload.wikimedia.org/wikipedia/commons/6/68/Eurasian_wolf_2.jpg',
    'https://www.seriouseats.com/thmb/_NG-wMfnkk8morFmrzng64FGmQs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__02__20141125-hot-pot-guide-shao-zhong-17-840d212f16344f479e521b4f0efbe154.jpg',
    'https://people.com/thmb/VN7ExxD_pxDIXtTZpWxuZXY9VjM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(670x0:672x2)/MSDFOGU_EC001_preview-6f5fe67fd675494d82cf8ac3cb34ce45.jpg',
    'https://www.goodnewsnetwork.org/wp-content/uploads/2022/02/gaming-controllers-and-sports-game-pubdomain-JESHOOTS.jpg',
    'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2022/8/12/pkvleqqdcqrj5iorriv2/skateboarding'];
    const altText = ['A Wolf in Snow', "Delicious Chinese Hotpot", "Forrest Gump Running",
    "Video Games with friends", "Cool Skateboarding"];
    let count = (getRandomInt(5));
    let newImage = document.createElement("img");
    newImage.src = urls[count];
    newImage.alt = altText[count];
    let holder = document.getElementById('image-holder');
    holder.innerHTML = "";
    holder.appendChild(newImage);
  }

  /**
   * This function allows users to switch between day and night mode every time they
   * press the button on the screen. If the user switches to night mode, selected parts
   * of wording contents are italic. If the user switches back from night mode, the italic
   * texts turns normal.
   */
  function modeSwitch() {
    let bodyColor = document.body;
    bodyColor.classList.toggle('day-mode');
    bodyColor.classList.toggle('night-mode');
    let textFont = document.querySelectorAll('h1, h2, h3, p');
    for (let i = 0; i < 5; i++) {
      if (bodyColor.classList.contains('night-mode')) {
        textFont[i].classList.add('italic-text');
      } else {
        textFont[i].classList.remove('italic-text');
      }
    }
  }

  /**
   * Handles the fetch request made by the reader, checks status, convert the content
   * into JSON object and finally show the content on the screen. If there are errors
   * in any parts, catch errors accordingly.
   * @param {string} url - the url of the endpoint the reader is reaching out for
   * content
   */
  function jsonFetchRequest(url) {
    fetch(url)
      .then(statusCheck)
      .then(data => data.json())
      .then((data) => {
        reveal(data);
      })
      .catch(handleError);
  }

  /**
   * Handles the fetch request made by the reader, checks status, convert the content
   * into text and finally show the content on the screen. If there are errors
   * in any parts, catch errors accordingly.
   * @param {string} url - the url of the endpoint the reader is reaching out for
   * content
   */
  function textFetchRequest(url) {
    fetch(url)
      .then(statusCheck)
      .then(data => data.text())
      .then((data) => {
        reveal(data);
      })
      .catch(handleError);
  }

  /**
   * Reveals the content asked by the user and shows the content on screen
   * @param {array} data - data information in either JSON object or plain text
   */
  function reveal(data) {
    let content;
    let source = document.createElement("div");
    let answerSpot = document.getElementById('answer-spot');
    if (typeof data === "object" && data !== null) {
      content = data.question + ' ' + data.answer;
    } else if (typeof data === "string") {
      content = data;
    }
    source.textContent = content;
    answerSpot.appendChild(source);
  }

  /**
   * Check if the responses as promises being resolved, return the ones being resolved,
   * throw an error with the response text if the one is being rejected.
   * @param {Promise} response - a promise that is going to be checked
   * @returns {Promise} response - a promise that resolves successfully, throws an
   * error with original text if the promise gets rejected.
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /**
   * Handles the possible errors while the user is interacting with the page. It
   * shows the users the error text message and provide users with possible actions
   * to fix the error.
   * @param {object} error - an error occurred while processing the promises for
   * the promise being rejected
   */
  function handleError(error) {
    let errorMessage = document.createElement('p');
    errorMessage.textContent = error + ", please check your internet connection or come back later";
    document.getElementById('answer-spot').appendChild(errorMessage);
  }

  /**
   * Returns the random integer that falls within the range between number 0 (inclusive)
   * to max (exclusive)
   * @param {integer} max - an integer number that the maximum exclusive value
   * @returns {integer} A random integer between 0 (inclusive) and max (exclusive)
   */
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
})();