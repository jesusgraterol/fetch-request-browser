import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect, vi, Mock } from 'vitest';
import { buildRequest } from './utils/utils.js';
import { send, sendGET } from './index.js';

/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

// retrieves a mocked instance of the global fetch func
const mFetch = (): Mock => fetch as Mock;

// retrieves the args that were passed when fetch was called for a given call index (starts at 0)
const getFetchCallArg = (callIndex: number): any => {
  const mockedFn = mFetch();
  if (mockedFn.mock.calls.length < callIndex + 1) {
    throw new Error(`The mock function was only called ${mockedFn.mock.calls.length} times. Attempted to access call # ${callIndex + 1}`);
  }
  return mockedFn.mock.calls[callIndex][0];
};



/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('fetch-request', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('send', () => {
    test('can send a request with default options', async () => {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const data = { success: true };
      vi.stubGlobal('fetch', vi.fn(async () => ({
        status: 200,
        headers,
        json: () => Promise.resolve(data),
      })));
      await expect(send('https://www.google.com')).resolves.toStrictEqual({
        code: 200,
        headers,
        data,
      });
      expect(fetch).toHaveBeenCalledOnce();
      expect(getFetchCallArg(0)).toStrictEqual(buildRequest('https://www.google.com'));
    });
  });



  describe('sendGET', () => {
    beforeAll(() => { });

    afterAll(() => {});

    beforeEach(() => { });

    afterEach(() => {
      vi.useRealTimers();
    });

    test('can persist a GET request in case it fails', async () => {
      vi.useFakeTimers();
      vi.stubGlobal(
        'fetch',
        vi.fn().mockImplementationOnce(() => Promise.resolve({ status: 429 }))
          .mockImplementationOnce(() => Promise.resolve({ status: 429 }))
          .mockImplementationOnce(() => Promise.resolve({ status: 429 }))
          .mockImplementationOnce(() => Promise.resolve({
            status: 200,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            json: () => Promise.resolve({}),
          })),
      );
      expect(fetch).not.toHaveBeenCalled();

      sendGET('https://www.google.com', undefined, 3, 10);
      expect(fetch).toHaveBeenCalledTimes(1);

      await vi.advanceTimersByTimeAsync(10000);
      expect(fetch).toHaveBeenCalledTimes(2);

      await vi.advanceTimersByTimeAsync(10000);
      expect(fetch).toHaveBeenCalledTimes(3);

      await vi.advanceTimersByTimeAsync(10000);
      expect(fetch).toHaveBeenCalledTimes(4);

      await vi.advanceTimersByTimeAsync(10000); // cleared - should not call send again
      expect(fetch).toHaveBeenCalledTimes(4);
    });
  });
});
