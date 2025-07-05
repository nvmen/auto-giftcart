console.log("Cucumber configuration loaded");
// module.exports = {
//   default: {
//     require: [
//       './src/**/*.ts',
//       './src/features/step-definitions/**/*.ts', // Step definitions
//       './src/support/**/*.ts'                    // World, hooks
//     ],
//     requireModule: ['ts-node/register'],
//     paths: ['src/features/**/*.feature'],
//     format: ['progress'],
//     timeout: 60000
//   }
// };


const config = {
  import: ['src/**/*.ts'],
  format: [
    // 'message:e2e/reports/cucumber-report.ndjson',
    'json:reports/cucumber-report.json',
    'html:reports/report.html',
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
