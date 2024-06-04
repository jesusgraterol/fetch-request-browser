import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from 'vitest';
import { sendGET, sendPOST } from './index.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('sendGET', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can send a GET request', async () => {
    const url = 'https://httpbin.org/get';
    const { headers, data } = await sendGET(url);

    expect(headers.get('Content-Type')).toBe('application/json');

    expect(typeof data).toBe('object');
    expect(data.args).toStrictEqual({});
    expect(typeof data.headers).toBe('object');
    expect(data.headers.Accept).toBe('application/json');
    expect(data.headers['Content-Type']).toBe('application/json');
    expect(data.url).toBe(url);
  }, 60000);


  test('can send a GET request w/ query string', async () => {
    const url = 'https://httpbin.org/get?foo=hey&bar=123';
    const { headers, data } = await sendGET(url);

    expect(headers.get('Content-Type')).toBe('application/json');

    expect(typeof data).toBe('object');
    expect(data.args).toStrictEqual({ foo: 'hey', bar: '123'});
    expect(typeof data.headers).toBe('object');
    expect(data.headers.Accept).toBe('application/json');
    expect(data.headers['Content-Type']).toBe('application/json');
    expect(data.url).toBe(url);
  }, 60000);
});


describe('sendPOST', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can send a POST request with a body', async () => {
    const url = 'https://httpbin.org/post';
    const body = {
      someKey: 'Hello',
      someNumber: 123456,
    };
    const { headers, data } = await sendPOST(url, { requestOptions: { body } });

    expect(headers.get('Content-Type')).toBe('application/json');

    expect(typeof data).toBe('object');
    expect(data.args).toStrictEqual({});
    expect(data.json).toStrictEqual(body);
    expect(typeof data.headers).toBe('object');
    expect(data.headers.Accept).toBe('application/json');
    expect(data.headers['Content-Type']).toBe('application/json');
    expect(data.url).toBe(url);
  }, 60000);
});
