import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { ICustomWorld } from './custom-world';
import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import * as firefox from 'selenium-webdriver/firefox.js';
import { Config } from '../conf/config';

async function createDriver(): Promise<ThenableWebDriver> {
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

setDefaultTimeout(Config.timeouts.test);

Before({ tags: '@ignore' }, function () {
  return 'skipped';
});

Before({ tags: '@debug' }, function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (
  this: ICustomWorld,
  { pickle }: { pickle: import('@cucumber/messages').Pickle }
) {
  this.startTime = new Date();
  console.log(`Starting test: ${pickle.name}`);
  this.testName = pickle.name.replace(/\W/g, '-');
  this.driver = await createDriver();

  this.feature = pickle;
});

After(function (this: ICustomWorld) {
  return this.driver?.quit();
});
