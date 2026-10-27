const { test, expect } = require('@playwright/test');

// Public mock API: https://jsonplaceholder.typicode.com
test.describe('Posts API', () => {
  test('GET /posts/1 returns a single post @smoke', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({ id: 1, userId: 1 });
    expect(body.title).toBeTruthy();
  });

  test('GET /posts returns 100 posts @regression', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.ok()).toBeTruthy();
    expect(await response.json()).toHaveLength(100);
  });

  test('POST /posts creates a post @regression', async ({ request }) => {
    const payload = { title: 'QA test', body: 'created by Playwright', userId: 1 };
    const response = await request.post('/posts', { data: payload });
    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject(payload);
  });

  test('DELETE /posts/1 succeeds @regression', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  });

  test('GET unknown post returns 404 @regression', async ({ request }) => {
    const response = await request.get('/posts/999999');
    expect(response.status()).toBe(404);
  });
});
