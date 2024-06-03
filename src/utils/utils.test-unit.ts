import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect, vi } from 'vitest';
import { IResponseDataType } from '../shared/types.js';
import { extractResponseData } from './utils.js';
import { ERRORS } from '../shared/errors.js';

/* ************************************************************************************************
 *                                             MOCKS                                              *
 ************************************************************************************************ */

const r = (): Response => (<any>{
  arrayBuffer: vi.fn(() => Promise.resolve()),
  blob: vi.fn(() => Promise.resolve()),
  formData: vi.fn(() => Promise.resolve()),
  json: vi.fn(() => Promise.resolve()),
  text: vi.fn(() => Promise.resolve()),
});





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('extractResponseData', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can extract any data type', async () => {
    const res = r();
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
    await expect(() => extractResponseData(r(), <IResponseDataType>'nonsense')).rejects.toThrowError(ERRORS.INVALID_RESPONSE_DTYPE);
  });
});
