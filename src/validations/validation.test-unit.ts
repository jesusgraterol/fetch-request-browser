import { describe, test, expect } from 'vitest';
import { ERRORS } from '../shared/errors.js';
import { buildOptions } from '../utils/utils.js';
import { validateResponse } from './validations.js';

/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

const rq = (
  headers: Headers = new Headers({ Accept: 'application/json' }),
): Request => (<any>{
  headers,
});

const rs = (
  status: number = 200,
  statusText: string = 'OK',
  headers: Headers = new Headers({ 'Content-Type': 'application/json' }),
): Response => (<any>{
  status,
  statusText,
  headers,
});





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('validateResponse', () => {
  test('can validate a successful response', () => {
    expect(validateResponse(rq(), rs(), buildOptions())).toBeUndefined();
  });

  test('throws if the response status is not included in the acceptable list', () => {
    expect(
      () => validateResponse(rq(), rs(), buildOptions({ acceptableStatusCodes: [201] })),
    ).toThrowError(ERRORS.UNEXPECTED_RESPONSE_STATUS_CODE);
  });

  test('throws if the response status is not within the acceptable range', () => {
    expect(
      () => validateResponse(rq(), rs(300), buildOptions()),
    ).toThrowError(ERRORS.UNEXPECTED_RESPONSE_STATUS_CODE);
  });

  test('a response can be successful even if the Content-Type Header is not identical to the request\'s Accept Header', () => {
    expect(
      validateResponse(rq(), rs(200, 'OK', new Headers({ 'Content-Type': 'application/json; charset=utf-8' })), buildOptions()),
    ).toBeUndefined();
  });

  test('throws if the request\' content type is different to the response\'s', () => {
    expect(
      () => validateResponse(rq(), rs(200, 'OK', new Headers({ 'Content-Type': 'text/html' })), buildOptions()),
    ).toThrowError(ERRORS.CONTENT_TYPE_MISSMATCH);
  });
});
