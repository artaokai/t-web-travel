import { disabledButton } from "./disabledButton.js";
import { getUrl } from "./getUrl.js";

let app = document.getElementById('app');
let form = document.getElementById('form');
let content = document.getElementById('content');

disabledButton(); // disable button at the beginning and with empty input

form.addEventListener('submit', e => {
    e.preventDefault();

    content.innerHTML = '<img src="assets/img/spinning-circles.svg" alt="loader" />';

    let url = e.target.url.value; // get value of input
    let domain = url.split('/')[2]; // get domain

    if (domain === 'www.tiktok.com' || domain === 'vm.tiktok.com' || domain === 'vt.tiktok.com' || domain === 'v.douyin.com') {
        getUrl(url); // get data video
    } else {
        content.innerHTML = `<div class="alert alert-danger alert-dismissable fade show p-3">
  <p>Error, The url is not a tiktok link!</p>
  </div>`
    }
    e.target.reset();
})