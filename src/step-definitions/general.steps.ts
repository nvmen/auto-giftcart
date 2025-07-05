import { Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';
import { logStep } from '../support/logger';

Then('I take Screenshot', async function (this: ICustomWorld): Promise<void> {
  const driverPage = this.driver;
  const image = await driverPage?.takeScreenshot();
  if (image) {
    logStep('Screenshot taken');
    this.attach(image, 'image/png');
  }
});
