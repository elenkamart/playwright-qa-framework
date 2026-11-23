// Override from the command line, e.g. UI_BASE_URL=https://staging.example.com npm test
export const env = {
  uiBaseUrl: process.env.UI_BASE_URL ?? 'https://www.saucedemo.com',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
};

// Where the logged-in browser state is saved by the setup project.
export const STORAGE_STATE = '.auth/standard-user.json';
