import { encodeError, isEncodedError } from 'error-message-utils';
import { isArrayValid, isObjectValid } from 'web-utils-kit';
import { ERRORS } from '../shared/errors.js';
import {
  IRequestInput,
  IRequestOptions,
  IRequestMethod,
  IResponseDataType,
  IOptions,
  IProcessedRequestOptions,
} from '../shared/types.js';

/* ************************************************************************************************
 *                                         REQUEST HELPERS                                        *
 ************************************************************************************************ */

/**
 * Builds the request input (URL).
 * @param requestInput
 * @returns URL
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 */
const __buildRequestInput = (requestInput: IRequestInput): URL => {
  if (requestInput instanceof URL) {
    return requestInput;
  }
  try {
    return new URL(requestInput);
  } catch (e) {
    throw new Error(encodeError(e, ERRORS.INVALID_REQUEST_URL));
  }
};

/**
 * Builds the headers that will be used in the request. If none are provided, it returns the default
 * Headers.
 * @param headers
 * @param method
 * @returns Headers
 * @throws
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 */
const __buildRequestHeaders = (headers: any, method: IRequestMethod): Headers => {
  let reqHeaders: Headers;

  // init the Headers Instance
  if (headers && typeof headers === 'object') {
    try {
      reqHeaders = new Headers(headers);
    } catch (e) {
      throw new Error(encodeError(e, ERRORS.INVALID_REQUEST_HEADERS));
    }
  } else if (headers instanceof Headers) {
    reqHeaders = headers;
  } else {
    reqHeaders = method === 'GET'
      ? new Headers({ Accept: 'application/json' })
      : new Headers({ Accept: 'application/json', 'Content-Type': 'application/json' });
  }

  // include the Accept Header in case it wasn't provided
  if (!reqHeaders.has('Accept')) {
    reqHeaders.append('Accept', 'application/json');
  }

  // include the Content-Type Header in case it wasn't included and it isn't a GET request
  if (!reqHeaders.has('Content-Type') && method !== 'GET') {
    reqHeaders.append('Content-Type', 'application/json');
  }

  // finally, return the headers
  return reqHeaders;
};

/**
 * Builds the body of the request in string format.
 * @param body
 * @returns BodyInit | null
 */
const __buildRequestBody = (body: any): BodyInit | null => {
  if (body) {
    if (isObjectValid(body, true) || isArrayValid(body, true)) {
      return JSON.stringify(body);
    }
    return body;
  }
  return null;
};

/**
 * Builds the options for a request from a partial object.
 * @param opts
 * @returns IRequestOptions
 * @throws
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 */
const __buildRequestOptions = (opts: Partial<IRequestOptions> = {}): IProcessedRequestOptions => {
  const method: IRequestMethod = opts.method ?? 'GET';
  return {
    method,
    mode: opts.mode ?? 'cors',
    cache: opts.cache ?? 'default',
    credentials: opts.credentials ?? 'same-origin',
    headers: __buildRequestHeaders(opts.headers, method),
    priority: opts.priority ?? 'auto',
    redirect: opts.redirect ?? 'follow',
    referrer: opts.referrer ?? 'about:client',
    referrerPolicy: opts.referrerPolicy ?? 'no-referrer-when-downgrade',
    signal: opts.signal,
    integrity: opts.integrity || '',
    keepalive: opts.keepalive ?? false,
    body: method === 'GET' ? null : __buildRequestBody(opts.body),
  };
};

/**
 * Builds the Request Instance based on given input and options.
 * @param input
 * @param options
 * @returns Request
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 */
const buildRequest = (input: IRequestInput, options?: Partial<IRequestOptions>): Request => {
  try {
    return new Request(__buildRequestInput(input), __buildRequestOptions(options));
  } catch (e) {
    // if it is a known error, just rethrow it. Otherwise, it is a request options error
    if (isEncodedError(e)) {
      throw e;
    }
    throw new Error(encodeError(e, ERRORS.INVALID_REQUEST_OPTIONS));
  }
};





/* ************************************************************************************************
 *                                        RESPONSE HELPERS                                        *
 ************************************************************************************************ */

/**
 * Extracts the data from the Response object based on the provided data type.
 * @param res
 * @param dType
 * @returns Promise<IResponseData<T>>
 * @throws
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const extractResponseData = async <T>(
  res: Response,
  dType: IResponseDataType,
): Promise<T> => {
  switch (dType) {
    case 'arrayBuffer': {
      return res.arrayBuffer() as T;
    }
    case 'blob': {
      return res.blob() as T;
    }
    case 'formData': {
      return res.formData() as T;
    }
    case 'json': {
      return res.json() as T;
    }
    case 'text': {
      return res.text() as T;
    }
    default: {
      throw new Error(encodeError(`The provided response data type '${dType}' is invalid.`, ERRORS.INVALID_RESPONSE_DTYPE));
    }
  }
};





/* ************************************************************************************************
 *                                          MISC HELPERS                                          *
 ************************************************************************************************ */

/**
 * Builds the main options object based on given args (if any).
 * @param options
 * @returns IOptions
 */
const buildOptions = (options: Partial<IOptions> = {}): IOptions => ({
  requestOptions: options.requestOptions,
  responseDataType: options.responseDataType ?? 'json',
  acceptableStatusCodes: options.acceptableStatusCodes,
  acceptableStatusCodesRange: options.acceptableStatusCodesRange ?? { min: 200, max: 299 },
  skipStatusCodeValidation: options.skipStatusCodeValidation ?? false,
});





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // request helpers
  buildRequest,

  // response helpers
  extractResponseData,

  // misc helpers
  buildOptions,
};
