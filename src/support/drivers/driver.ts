import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import * as firefox from 'selenium-webdriver/firefox.js';
import * as chrome from 'selenium-webdriver/chrome.js';
import * as safari from 'selenium-webdriver/safari.js';
import * as edge from 'selenium-webdriver/edge.js';

async function createFireFoxDriver(): Promise<ThenableWebDriver> {
  const options = new firefox.Options();
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1280,800');
  // options.addArguments('--headless'); // Headless mode
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  options.addArguments('--ignore-certificate-errors');
  const driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
  await driver.manage().setTimeouts({ pageLoad: 60000 });
  return driver;
}

async function createChromeDriver(): Promise<ThenableWebDriver> {
  const options = new chrome.Options();
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1280,800');
  // options.addArguments('--headless'); // Headless mode
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--ignore-certificate-errors');
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  await driver.manage().setTimeouts({ pageLoad: 60000 });
  return driver;
}
async function createSafariDriver(): Promise<ThenableWebDriver> {

  const options = new safari.Options();
  const driver = await new Builder()
    .forBrowser('safari')
    .setSafariOptions(options)
    .build();
  await driver.manage().setTimeouts({ pageLoad: 60000 });
  return driver;
}
async function createEdgeDriver(): Promise<ThenableWebDriver> {
  const options = new edge.Options();
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1280,800');
  // options.addArguments('--headless'); // Headless mode
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--ignore-certificate-errors');
  const driver = await new Builder()
    .forBrowser('MicrosoftEdge')
    .setEdgeOptions(options)
    .build();
  await driver.manage().setTimeouts({ pageLoad: 60000 });
  return driver;
}

async function createDriverForTesting(): Promise<ThenableWebDriver> {
  const browser = process.env.BROWSER ?? 'firefox';
  switch (browser) {
    case 'firefox':
      return createFireFoxDriver();
    case 'chrome':
      return createChromeDriver();
    case 'safari':
      return createSafariDriver();
    case 'edge':
      return createEdgeDriver();
    default:
      throw new Error(`Unsupported browser: ${browser}`);
  }
}

export {
  createDriverForTesting
};