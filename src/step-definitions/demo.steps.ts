import { Given, setDefaultTimeout } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';
import { Key } from 'selenium-webdriver';
import { logStep } from '../support/logger';
// import assert from 'assert';
setDefaultTimeout(10000); // 10 seconds
Given('I open the browser {string}', { timeout: 60000 }, async function (this: ICustomWorld, name: string): Promise<void> {
  const driverPage = this.driver;
  logStep(`Opening browser: ${name}`);
  await driverPage.get('http://the-internet.herokuapp.com');
  await driverPage.wait(async () => {
    const readyState = await driverPage.executeScript('return document.readyState');
    return readyState === 'complete';
  }, 10000); // timeout in ms
  logStep(`Browser ${name} opened successfully`);
});

Given('I navigate to google and search', async function (this: ICustomWorld): Promise<void> {
  const driverPage = this.driver;
  await driverPage.findElement({ name: 'q' }).sendKeys('Cucumber JS', Key.RETURN);
  await driverPage.sleep(5000); // sleep for 5 seconds
});

Given('I open the login page', async function (this: ICustomWorld): Promise<void> {
  const driverPage = this.driver;
  await driverPage.get('http://the-internet.herokuapp.com/login');
  await driverPage.sleep(5000); // sleep for 5 seconds
  // assert.equal(1, 2, 'This is a test assertion failure'); // This will fail the test
  logStep('Login page opened');
});
