import { WebDriver } from 'selenium-webdriver/lib/webdriver';
import { Config } from '../conf/config';

export default class BasePage {
  protected myDriver: WebDriver;
  protected url: string;
  protected timeout: number = Config.timeouts.implicit;
  constructor(driver: WebDriver, url: string) {
    this.myDriver = driver;
    this.url = url;
  }
}
