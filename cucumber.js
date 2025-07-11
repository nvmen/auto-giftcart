console.log("Cucumber configuration load test");
import dotenv from 'dotenv';
dotenv.config();
const config = {
  import: [
    '!src/support/reporters/report.ts', // Exclude the report.ts file to avoid circular dependencies,
    'src/**/*.ts'    
  ],
  format: [
    // 'message:e2e/reports/cucumber-report.ndjson',
    'json:reports/cucumber-report.json',
    //'html:reports/report.html',
    'summary',
    'progress-bar'
  ],
  paths: ['src/features/**/*.feature'],
  formatOptions: { snippetInterface: 'async-await' },  
};

if (process.env.USE_ALLURE) {
  config.format.push('./src/support/reporters/allure-reporter.ts');
} else {
  config.format.push('@cucumber/pretty-formatter');
}

export default config;
