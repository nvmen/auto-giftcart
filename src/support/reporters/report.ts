import * as reporter from 'cucumber-html-reporter';
import * as fs from 'fs';
import * as path from 'path';
const currentPath = process.cwd();
const jsonReportPath = path.join(currentPath, '/reports/cucumber-report.json');
const htmlReportDir = path.join(currentPath, '/reports/html');
// Create HTML directory if it doesn't exist
if (!fs.existsSync(htmlReportDir)) {
  fs.mkdirSync(htmlReportDir, { recursive: true });
}

// Options for HTML report
const options: reporter.Options = {
  theme: 'bootstrap',
  jsonFile: jsonReportPath,
  output: path.join(htmlReportDir, 'cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': process.env.ENVIRONMENT ?? 'Development',
    'Browser': process.env.BROWSER ?? 'firefox',
    'Platform': process.platform,
    'Parallel': 'Scenarios',
    'Executed': 'Remote'
  }
};

// Generate the report
try {
  reporter.generate(options);
  console.log('HTML report generated successfully!');
} catch (error) {
  console.error('Error generating HTML report:', error);
}