const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
const { URL } = require('url');

const formatDate = require('./helpers/formatDate');
const createDirectory = require('./helpers/createDirectory');
const screenSizes = require('./screenSizes');

const takeScreenshot = async (site, width, height) => {
  try {
    console.log(`Visiting ${site} with a ${width}x${height} window...`);

    const { hostname } = new URL(site);
    createDirectory(hostname);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width,
      height,
      deviceScaleFactor: 1,
    });

    await page.goto(site, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    //TODO: const title = await page.title();
    const filename = `${formatDate()}_${width}x${height}_${hostname}.png`;

    await page.screenshot({
      path: `./screenshots/${hostname}/${filename}`,
      fullPage: true,
    });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

const screenshotPuppet = async () => {
  const site = readlineSync.question('Paste a full URL: ');

  screenSizes.forEach(
    async ({ width, height }) => await takeScreenshot(site, width, height)
  );
};

screenshotPuppet();
