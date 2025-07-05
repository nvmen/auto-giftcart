export const Config = {
  timeouts: {
    implicit: 10000,
    pageLoad: 30000,
    script: 30000,
    test: 60000
  },
  reports: {
    outputDir: 'reports',
    screenshotsDir: 'screenshots',
    jsonReportPath: 'reports/cucumber-report.json'
  },
  browserScreen: {
    width: 1280,
    height: 1024
  }
};
