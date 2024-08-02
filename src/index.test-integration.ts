import { describe, test, expect } from 'vitest';
import { sendDELETE, sendGET, sendPATCH, sendPOST, sendPUT } from './index.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('sendGET', () => {
  test('can send a GET request', async () => {
    const url = 'https://httpbin.org/get';
    const { code, headers, data } = await sendGET(url);

    expect(code).toBe(200);

    expect(headers.get('Content-Type')).toBe('application/json');

    expect(typeof data).toBe('object');
    expect(data.args).toStrictEqual({});
    expect(typeof data.headers).toBe('object');
    expect(data.headers.Accept).toBe('application/json');
    expect(data.url).toBe(url);
  }, 60000);


  test('can send a GET request w/ query string', async () => {
    const url = 'https://httpbin.org/get?foo=hey&bar=123';
    const { code, headers, data } = await sendGET(url);

    expect(code).toBe(200);

    expect(headers.get('Content-Type')).toBe('application/json');

    expect(typeof data).toBe('object');
    expect(data.args).toStrictEqual({ foo: 'hey', bar: '123' });
    expect(typeof data.headers).toBe('object');
    expect(data.headers.Accept).toBe('application/json');
    expect(data.url).toBe(url);
  }, 60000);
});





describe('sendPOST', () => {
  test('can send a POST request with a body', async () => {
    const url = 'https://httpbin.org/post';
    const body = {
      someKey: 'Hello',
      someNumber: 123456,
    };
    const { code, headers, data } = await sendPOST(url, { requestOptions: { body } });

    expect(code).toBe(200);

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





describe('sendPUT', () => {
  test('can send a PUT request with a body', async () => {
    const url = 'https://httpbin.org/put';
    const body = {
      someKey: 'Hello',
      someNumber: 123456,
    };
    const { code, headers, data } = await sendPUT(url, { requestOptions: { body } });

    expect(code).toBe(200);

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





describe('sendPATCH', () => {
  test('can send a PATCH request with a body', async () => {
    const url = 'https://httpbin.org/patch';
    const body = {
      someKey: 'Hello',
      someNumber: 123456,
    };
    const { code, headers, data } = await sendPATCH(url, { requestOptions: { body } });

    expect(code).toBe(200);

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





describe('sendDELETE', () => {
  test('can send a DELETE request without a body', async () => {
    const url = 'https://httpbin.org/delete';
    const { code, headers, data } = await sendDELETE(url);

    expect(code).toBe(200);

    expect(headers.get('Content-Type')).toBe('application/json');

    expect(typeof data).toBe('object');
    expect(data.args).toStrictEqual({});
    expect(data.json).toStrictEqual(null);
    expect(typeof data.headers).toBe('object');
    expect(data.headers.Accept).toBe('application/json');
    expect(data.headers['Content-Type']).toBe('application/json');
    expect(data.url).toBe(url);
  }, 60000);

  test('can send a DELETE request with a body', async () => {
    const url = 'https://httpbin.org/delete';
    const body = {
      someKey: 'Hello',
      someNumber: 123456,
    };
    const { code, headers, data } = await sendDELETE(url, { requestOptions: { body } });

    expect(code).toBe(200);

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
