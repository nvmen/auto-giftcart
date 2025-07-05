console.log("Cucumber configuration loaded");
module.exports = {
  default: {
    require: [
      './src/**/*.ts',
      "./src/features/step-definitions/**/*.ts", // Step definitions
      "./src/support/**/*.ts"                    // World, hooks (nếu có)
    ],
    requireModule: ["ts-node/register"],
    paths: ['src/features/**/*.feature'],
    format: ["progress"],
    timeout: 60000
  }
};