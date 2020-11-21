const config = require('./config.js')

module.exports.login = async function (page) {
  // Input credentials
  await page.goto(config.LOGIN_PAGE);
  await page.waitForSelector(config.USERNAME_SELECTOR)
  await page.click(config.USERNAME_SELECTOR, { clickCount: 3 });
  await page.keyboard.type(process.env.EMAIL);
  await page.click(config.PASSWORD_SELECTOR, { clickCount: 3 });
  await page.keyboard.type(process.env.PASSWORD);
  await page.click(config.BUTTON_SELECTOR);

  // Check if login was successful
  try {
    const response = await page.waitForNavigation({ waituntil: "loaded" });
    await response.request().redirectChain();
    await page.waitForSelector(
      `${config.SUCCESS_SELECTOR_1}, ${config.SUCCESS_SELECTOR_2}`
    );
    return;
  } catch (error) {
    throw new Error("Failed to log in, try again");
  }
};
