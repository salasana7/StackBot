const { login } = require("./login-function");
const puppeteer = require("puppeteer");

module.exports.getOH = async () => {
  let launchOptions = {
    // headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // defaultViewport: null,
    // slowMo: 120,
  };

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  await login(page);
  await page.goto("https://learn.fullstackacademy.com/officehours", {
    waitUntil: "networkidle2",
  });
  await page.waitForSelector(
    "#office-hour-list > div > div.container.mt3 > div"
  );
  const result = await page.evaluate(() => {
    let board = document.querySelector(
      `#office-hour-list > div > div.container.mt3 > div`
    ).children;
    board = [...board];
    let oh = [];
    for (let elem of board) {
      let name = elem.querySelector("div > div > div:nth-child(2) > a");
      let slots = Array.from(
        elem.querySelectorAll(
          "div:nth-child(2) > div:nth-child(3) > table > tr"
        )
      );
      let button = Array.from(elem.querySelectorAll("button"));
      let time = elem.querySelector("div:nth-child(2) > div:nth-child(2) > p");
      oh.push({
        name: name.innerText,
        slots: slots.length,
        open: button.length,
        time: time.innerText,
      });
    }
    return oh;
  });
  await browser.close();
  return result;
};
