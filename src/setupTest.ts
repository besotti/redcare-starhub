import '@testing-library/jest-dom';

import { server } from '@root/__api__/server';
import { queryClient } from '@root/queryClient';
import { config } from 'dotenv';
import { resolve } from 'path';
import { afterEach } from 'vitest';

config({ path: resolve(__dirname, '../.env.test') });

beforeAll(() => server.listen());

beforeEach(() => {
  queryClient.clear();
  server.resetHandlers();
  localStorage.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  queryClient.clear();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  vi.resetAllMocks();
});

// Mock IntersectionObserver since it's not implemented in jsdom (used by Vitest).
// Prevents runtime errors when components rely on visibility detection (e.g. lazy loading).
class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';

  readonly thresholds: readonly number[];

  constructor() {
    this.thresholds = [];
  }

  disconnect() {
    // do nothing
  }

  observe() {
    // do nothing
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {
    // do nothing
  }
}
window.IntersectionObserver = IntersectionObserver;
