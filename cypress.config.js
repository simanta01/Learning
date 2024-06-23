const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.ebay.com/sch/ebayadvsearch', // Ebay Url
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', // E2E test files pattern
  },
  // Video Evidence
  video: true,
  videoCompression: 32,
  videosFolder: 'cypress/videos',
});
