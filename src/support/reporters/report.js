import { generate } from 'cucumber-html-reporter';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const currentPath = process.cwd();
const jsonReportPath = join(currentPath, '/reports/cucumber-report.json');
const htmlReportDir = join(currentPath, '/reports/html');

// Create HTML directory if it doesn't exist
if (!existsSync(htmlReportDir)) {
  mkdirSync(htmlReportDir, { recursive: true });
}

// Options for HTML report
const options = {
  theme: 'bootstrap',
  jsonFile: jsonReportPath,
  output: join(htmlReportDir, 'cucumber-report.html'),
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
  generate(options);
  console.log('HTML report generated successfully!');
} catch (error) {
  console.error('Error generating HTML report:', error);
}
