import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { ThenableWebDriver, WebDriver } from 'selenium-webdriver';

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  testName?: string;
  startTime?: Date;
  driver: WebDriver;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }

  feature?: messages.Pickle | undefined;
  testName?: string | undefined;
  startTime?: Date | undefined;
 driver!: ThenableWebDriver;
  debug = false;
  debugLog = '';
}

setWorldConstructor(CustomWorld);
