const fetch = require("node-fetch");
const cheerio = require("cheerio");

const btnEl = document.getElementById("btn-el");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

let sites = [];

const url = ''

//getting the sites info from the local storage
let sfls = JSON.parse(localStorage.getItem("sites"));
if (sfls) {
  sites = sfls;
  render(sites);
}
// const tabs=[
// {url:"www.flipkart.com"}
// ]
btnEl.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    sites.push(tabs[0].url);
    inputEl.value = "";
    localStorage.setItem("sites", JSON.stringify(sites));
    render(sites);
  });
});
function render(sites) {
  let listitem = "";
  console.log(sites);
  for (let i = 0; i < sites.length; i++) {
    listitem += `
        <li>
            <a target='_blank' href='${sites[i]}'>
                ${sites[i]}
            </a>    
        </li>`;
  }
  ulEl.innerHTML = listitem;
}

const getFlipkartData = async (url) => {
  var requestOptions = {
    method: "GET",
    headers: {
      Cookie:
        "SN=VI433AE878EB73468CB6C921F9FE2C820B.TOK4280C5FE4DED487C8ECFEA75779307BC.1647169991.LO; T=TI164716999139500296827170616890881757764964967280888178739446404112",
    },
    redirect: "follow",
  };
  const res = await fetch(url, requestOptions);
  const body = await res.text();
  const $ = cheerio.load(body);
  const img = $("._3exPp9");
  const title = img.attr("alt");
  const imageData = img.attr("src");
  return [title, imageData];
};

const getAmazonData = async (url) => {
  var requestOptions = {
    method: "GET",
    headers: {
      Cookie:
        "SN=VI433AE878EB73468CB6C921F9FE2C820B.TOK4280C5FE4DED487C8ECFEA75779307BC.1647169991.LO; T=TI164716999139500296827170616890881757764964967280888178739446404112",
    },
    redirect: "follow",
  };
  const res = await fetch(url, requestOptions);
  const body = await res.text();
  const $ = cheerio.load(body);
  const img = $(".a-dynamic-image");
  const title = img.attr("alt");
  const imageData = img.attr("src");
  return [title, imageData];
};
