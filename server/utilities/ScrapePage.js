const { chromium } = require("playwright");

async function ScrapePage(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const concatenatedText = await page.evaluate(() => {
    const pTags = document.querySelectorAll("p");
    let textString = "";
    pTags.forEach((pTag) => {
      textString += pTag.textContent.trim() + " ";
    });
    return textString.trim();
  });

  await browser.close();

  return concatenatedText;
}

module.exports = ScrapePage;
