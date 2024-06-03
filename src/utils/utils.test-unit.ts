import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect, vi } from 'vitest';
import { IResponseDataType } from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';
import { buildRequest, extractResponseData } from './utils.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the default headers when none are provided
const DEFAULT_HEADERS = new Headers({ 'Content-Type': 'application/json' });


/* ************************************************************************************************
 *                                             MOCKS                                              *
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
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

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
    expect(req.headers).toStrictEqual(DEFAULT_HEADERS);
  });

  test('can instantiate a Request with custom options', () => {
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
    expect(req.body).toBeNull();
    expect(req.headers).toStrictEqual(DEFAULT_HEADERS);
  });

  test('can use an URL instance rather than a string', () => {
    const req = buildRequest(new URL('https://www.mozilla.org/favicon.ico'));
    expect(req.url).toBe('https://www.mozilla.org/favicon.ico');
  });

  test('can include custom headers', () => {
    const headers = new Headers({
      'Content-Type': 'text/html',
      Authorization: 'bearer 123456',
    });
    const req = buildRequest('https://www.mozilla.org/favicon.ico', {
      headers,
    });
    expect(req.headers).toStrictEqual(headers);
  });

  test('can include string data in the body', async () => {
    const data = { hello: 'World!' };
    const req = buildRequest('https://www.mozilla.org/favicon.ico', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    await expect(new Response(req.body).json()).resolves.toStrictEqual(data);
  });

  test('can include object data in the body', async () => {
    const data = { hello: 'World!' };
    const req = buildRequest('https://www.mozilla.org/favicon.ico', {
      method: 'POST',
      body: data,
    });
    await expect(new Response(req.body).json()).resolves.toStrictEqual(data);
  });
});





describe('extractResponseData', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

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
