// Override from the command line, e.g. UI_BASE_URL=https://staging.example.com npm test
module.exports = {
  uiBaseUrl: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
};
