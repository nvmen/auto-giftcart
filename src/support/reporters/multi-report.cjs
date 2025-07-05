/* eslint-disable @typescript-eslint/no-require-imports */

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const report = require('multiple-cucumber-html-reporter');
const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const fs = require('fs');
const os = require('os');
const currentPath = process.cwd();
const reportDir = join(currentPath, '/reports');
const htmlDir = join(currentPath, '/reports/html-multi');
const jsonDir = reportDir;
// Create HTML directory if it doesn't exist
if (!existsSync(htmlDir)) {
  mkdirSync(htmlDir, { recursive: true });
}
// Create JSON directory if it doesn't exist
if (!existsSync(jsonDir)) {
  mkdirSync(jsonDir, { recursive: true });
}
if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir, { recursive: true });
}

// Generate report
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
report.generate({
  jsonDir: jsonDir,
  reportPath: htmlDir,
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: os.platform(),
      version: process.version
    }
  },
  customData: {
    title: 'Test Execution Info',
    data: [
      { label: 'Project', value: 'TS-Cucumber-Selenium' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Test Cycle', value: 'Regression' },
      { label: 'Execution Date', value: new Date().toISOString().slice(0, 10) }
    ]
  },
  displayDuration: true,
  durationInMS: true,
  openReportInBrowser: true
});

console.log('Multi HTML report generated successfully!');
