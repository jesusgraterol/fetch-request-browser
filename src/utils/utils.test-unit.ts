import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect, vi } from 'vitest';
import { extractResponseData } from './utils.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('extractResponseData', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test.skip('can calculate 2 plus 2', async () => {
    const d = await extractResponseData(<Response>{}, 'text');
    expect(2 + 2).toBe(4);
  });
});
