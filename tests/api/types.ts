// Response shapes of https://jsonplaceholder.typicode.com used in the API tests.
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// Lightweight schema check: every field exists and has the right type.
export function expectPostShape(post: unknown): asserts post is Post {
  const p = post as Record<string, unknown>;
  for (const key of ['id', 'userId'] as const) {
    if (typeof p[key] !== 'number') throw new Error(`Post.${key} should be a number, got ${typeof p[key]}`);
  }
  for (const key of ['title', 'body'] as const) {
    if (typeof p[key] !== 'string') throw new Error(`Post.${key} should be a string, got ${typeof p[key]}`);
  }
}
