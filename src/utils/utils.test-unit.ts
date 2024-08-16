import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect, vi } from 'vitest';
import { IRequestOptions, IResponseDataType } from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';
import { buildOptions, buildRequest, delay, extractResponseData } from './utils.js';

/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

const rs = (): Response => (<any>{
  arrayBuffer: vi.fn(() => Promise.resolve()),
  blob: vi.fn(() => Promise.resolve()),
  formData: vi.fn(() => Promise.resolve()),
  json: vi.fn(() => Promise.resolve()),
  text: vi.fn(() => Promise.resolve()),
});





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('buildRequest', () => {
  test('can instantiate a Request with valid data', () => {
    const req = buildRequest('https://www.mozilla.org/favicon.ico');
    expect(req.url).toBe('https://www.mozilla.org/favicon.ico');
    expect(req.method).toBe('GET');
    expect(req.mode).toBe('cors');
    expect(req.cache).toBe('default');
    expect(req.credentials).toBe('same-origin');
    expect(req.redirect).toBe('follow');
    expect(req.referrer).toBe('about:client');
    expect(req.referrerPolicy).toBe('no-referrer-when-downgrade');
    expect(req.integrity).toBe('');
    expect(req.keepalive).toBe(false);
    expect(req.body).toBeNull();
    expect(req.headers).toEqual(new Headers({
      Accept: 'application/json',
    }));
  });

  test('can instantiate a Request with custom options', async () => {
    const req = buildRequest('https://www.mozilla.org/favicon.ico', {
      method: 'POST',
      mode: 'same-origin',
      cache: 'force-cache',
      credentials: 'omit',
      redirect: 'error',
      referrer: '',
      referrerPolicy: 'strict-origin-when-cross-origin',
      integrity: 'sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=',
      keepalive: true,
      body: { some: 'coolData' },
    });
    expect(req.url).toBe('https://www.mozilla.org/favicon.ico');
    expect(req.method).toBe('POST');
    expect(req.mode).toBe('same-origin');
    expect(req.cache).toBe('force-cache');
    expect(req.credentials).toBe('omit');
    expect(req.redirect).toBe('error');
    expect(req.referrer).toBe('');
    expect(req.referrerPolicy).toBe('strict-origin-when-cross-origin');
    expect(req.integrity).toBe('sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=');
    expect(req.keepalive).toBe(true);
    await expect(new Response(req.body).json()).resolves.toStrictEqual({ some: 'coolData' });
    expect(req.headers).toStrictEqual(new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }));
  });

  test('can use an URL instance rather than a string', () => {
    const req = buildRequest(new URL('https://www.mozilla.org/favicon.ico'));
    expect(req.url).toBe('https://www.mozilla.org/favicon.ico');
  });

  test('can include custom headers', () => {
    const headers = new Headers({
      Accept: 'text/html',
      'Content-Type': 'text/html',
      Authorization: 'bearer 123456',
    });
    const req = buildRequest('https://www.mozilla.org/favicon.ico', { headers });
    expect(req.headers).toStrictEqual(headers);
  });

  test('includes the Accept and Content-Type Headers if they are not provided', () => {
    const headers = new Headers({
      Authorization: 'bearer 123456',
    });
    expect(buildRequest('https://www.mozilla.org/favicon.ico', { headers }).headers).toStrictEqual(new Headers({
      Accept: 'application/json',
      Authorization: 'bearer 123456',
    }));
  });

  test('includes the Content-Type Header if it is not provided and the req has a body', () => {
    const headers = new Headers({
      Authorization: 'bearer 123456',
    });
    const req = buildRequest('https://www.mozilla.org/favicon.ico', { method: 'POST', headers, body: { foo: 'bar' } });
    expect(req.headers).toStrictEqual(new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'bearer 123456',
    }));
  });

  test('headers are case insensitive', () => {
    const headers = new Headers({ accept: 'text/html', 'content-type': 'text/html' });
    const req = buildRequest('https://www.mozilla.org/favicon.ico', { headers });
    expect(req.headers).toStrictEqual(headers);
  });

  test('can include string data in the body', async () => {
    const data = { hello: 'World!', foo: 123, baz: false };
    const req = buildRequest('https://www.mozilla.org/favicon.ico', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    await expect(new Response(req.body).json()).resolves.toStrictEqual(data);
  });

  test('can include object data in the body', async () => {
    const data = { hello: 'World!', foo: 123, baz: false };
    const req = buildRequest('https://www.mozilla.org/favicon.ico', {
      method: 'POST',
      body: data,
    });
    await expect(new Response(req.body).json()).resolves.toStrictEqual(data);
  });

  test('a GET request can have no body', () => {
    const req = buildRequest('https://www.mozilla.org/favicon.ico', {
      method: 'GET',
      body: { hello: 'World!', foo: 123, baz: false },
    });
    expect(req.body).toBeNull();
  });

  test('throws when an invalid URL is provided', () => {
    expect(() => buildRequest('someInvalidURL')).toThrowError(ERRORS.INVALID_REQUEST_URL);
  });

  test('throws when invalid headers are provided', () => {
    expect(() => buildRequest(
      'https://www.mozilla.org',
      { headers: { 'Content Type': 'application/json' } },
    )).toThrowError(ERRORS.INVALID_REQUEST_HEADERS);
  });

  test('throws when invalid options are provided', () => {
    expect(() => buildRequest(
      'https://www.mozilla.org',
      { mode: <RequestMode>'invalid-mode' },
    )).toThrowError(ERRORS.INVALID_REQUEST_OPTIONS);
  });
});





describe('extractResponseData', () => {
  test('can extract any data type', async () => {
    const res = rs();
    await extractResponseData(res, 'arrayBuffer');
    expect(res.arrayBuffer).toHaveBeenCalledOnce();
    await extractResponseData(res, 'arrayBuffer');
    expect(res.arrayBuffer).toHaveBeenCalledTimes(2);
    await extractResponseData(res, 'blob');
    expect(res.blob).toHaveBeenCalledOnce();
    await extractResponseData(res, 'formData');
    expect(res.formData).toHaveBeenCalledOnce();
    await extractResponseData(res, 'json');
    expect(res.json).toHaveBeenCalledOnce();
    await extractResponseData(res, 'text');
    expect(res.text).toHaveBeenCalledOnce();
  });

  test('throws an error if an invalid dtype is provided', async () => {
    await expect(() => extractResponseData(rs(), <IResponseDataType>'nonsense')).rejects.toThrowError(ERRORS.INVALID_RESPONSE_DTYPE);
  });
});





describe('buildOptions', () => {
  test('can build the default options object', () => {
    expect(buildOptions()).toStrictEqual({
      requestOptions: undefined,
      responseDataType: 'json',
      acceptableStatusCodes: undefined,
      acceptableStatusCodesRange: { min: 200, max: 299 },
      skipStatusCodeValidation: false,
    });
  });

  test('can build a custom options object', () => {
    const reqOptions: Partial<IRequestOptions> = {
      method: 'POST',
      headers: { 'Content-Type': 'text/html' },
    };
    const range = { min: 100, max: 499 };
    expect(buildOptions({
      requestOptions: reqOptions,
      responseDataType: 'text',
      acceptableStatusCodes: [200, 201],
      acceptableStatusCodesRange: range,
      skipStatusCodeValidation: true,
    })).toStrictEqual({
      requestOptions: reqOptions,
      responseDataType: 'text',
      acceptableStatusCodes: [200, 201],
      acceptableStatusCodesRange: range,
      skipStatusCodeValidation: true,
    });
  });
});





describe('delay', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(() => { });

  afterEach(() => { });

  test('can delay the execution of a function for any number of seconds', async () => {
    const mockFn = vi.fn();
    delay(10).then(mockFn);
    expect(mockFn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(11 * 1000);

    expect(mockFn).toHaveBeenCalledOnce();
  });
});
