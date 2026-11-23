import { test, expect } from '@playwright/test';
import { type Comment, type Post, expectPostShape } from './types';

// Public mock API: https://jsonplaceholder.typicode.com
test.describe('Posts API', () => {
  test('GET /posts/1 returns a valid post @smoke', async ({ request }) => {
    const response = await request.get('/posts/1');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body: unknown = await response.json();
    expectPostShape(body);
    expect(body).toMatchObject({ id: 1, userId: 1 });
  });

  test('GET /posts returns 100 posts with a valid shape @regression', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.ok()).toBeTruthy();

    const posts: unknown[] = await response.json();
    expect(posts).toHaveLength(100);
    posts.forEach(expectPostShape);
  });

  test('GET /posts?userId=1 returns only that user\'s posts @regression', async ({ request }) => {
    const response = await request.get('/posts', { params: { userId: 1 } });
    const posts: Post[] = await response.json();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.userId === 1)).toBe(true);
  });

  test('GET /posts/1/comments returns comments with valid emails @regression', async ({ request }) => {
    const response = await request.get('/posts/1/comments');
    const comments: Comment[] = await response.json();

    expect(comments.length).toBeGreaterThan(0);
    for (const c of comments) {
      expect(c.postId).toBe(1);
      expect(c.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }
  });

  test('POST /posts creates a post @regression', async ({ request }) => {
    const payload = { title: 'QA test', body: 'created by Playwright', userId: 1 };
    const response = await request.post('/posts', { data: payload });

    expect(response.status()).toBe(201);
    const created: Post = await response.json();
    expect(created).toMatchObject(payload);
    expect(typeof created.id).toBe('number');
  });

  test('PATCH /posts/1 updates only the given field @regression', async ({ request }) => {
    const response = await request.patch('/posts/1', { data: { title: 'Updated title' } });

    expect(response.status()).toBe(200);
    const updated: Post = await response.json();
    expect(updated.title).toBe('Updated title');
    expect(updated.userId).toBe(1); // untouched fields stay
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
