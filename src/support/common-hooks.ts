import { Before, After, setDefaultTimeout, ITestCaseHookParameter } from '@cucumber/cucumber';
import { ICustomWorld } from './custom-world';
import { Config } from '../conf/config';
import { getDateTimeJiraFormat } from '../utils/dateTimeUtils';
import { logResultsTest } from './logger';
import path from 'path';
import * as fs from 'fs';
import { createDriverForTesting } from './drivers/driver';

const screenshotsDir = path.join(process.cwd(), Config.reports.screenshotsDir);
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
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
  this.driver = await createDriverForTesting();

  this.feature = pickle;
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
After(async function (this: ICustomWorld & { attach: Function }, { result }: ITestCaseHookParameter) {
  let resultTest = 'TODO';
  const resultObj = {
    testStatus: resultTest,
    startTime: getDateTimeJiraFormat(this.startTime ?? new Date()),
    endTime: getDateTimeJiraFormat(new Date())
  };
  const screenshot = await this.driver.takeScreenshot();
  const screenshotName = `${(this.testName ?? 'unnamed_test').replace(/\s+/g, '_')}_${Date.now()}.png`;
  const screenshotPath = path.join(screenshotsDir, screenshotName);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  fs.writeFileSync(screenshotPath, screenshot, 'base64');
  // TODO: Attach screenshot to the report
  if (result) {
    switch (result?.status.toLowerCase()) {
      case 'passed':
        resultTest = 'PASSED';
        break;
      case 'failed':
        resultTest = 'FAILED';
        break;
      default:
        resultTest = 'TODO';
    }
    resultObj.testStatus = resultTest;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    logResultsTest(this.testName ?? '', JSON.stringify(resultObj) ?? '');
  }

  return this.driver?.quit();
});
