import { encodeError, isEncodedError } from 'error-message-utils';
import { ERRORS } from '../shared/errors.js';
import {
  IRequestInput,
  IResponseDataType,
  IResponseData,
  IRequestOptions,
  IRequestMethod,
  IOptions,
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
 * { 'Content-Type': 'application/json' }.
 * @param headers
 * @returns Headers
 * @throws
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - MISSING_CONTENT_TYPE_HEADER: if the Content-Type header is not present
 */
const __buildRequestHeaders = (headers: any): Headers => {
  let reqHeaders: Headers;
  if (headers && typeof headers === 'object') {
    try {
      reqHeaders = new Headers(headers);
    } catch (e) {
      throw new Error(encodeError(e, ERRORS.INVALID_REQUEST_HEADERS));
    }
  } else if (headers instanceof Headers) {
    reqHeaders = headers;
  } else {
    reqHeaders = new Headers({ 'Content-Type': 'application/json' });
  }
  if (!reqHeaders.has('Content-Type')) {
    throw new Error(encodeError(`The provided header did not include 'Content-Type'. Received: ${Array.from(reqHeaders.keys())}`, ERRORS.MISSING_CONTENT_TYPE_HEADER));
  }
  return reqHeaders;
};

/**
 * Builds the body of the request in string format.
 * @param body
 * @returns string | null
 */
const __buildRequestBody = (body: any): string | null => {
  if (body) {
    if (typeof body === 'object') {
      return JSON.stringify(body);
    }
    return body;
  }
  return null;
};

/**
 * Builds the options for a request from a partial object.
 * @param options
 * @returns IRequestOptions
 * @throws
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 */
const __buildRequestOptions = (options: Partial<IRequestOptions> = {}): IRequestOptions => {
  const method: IRequestMethod = options.method ?? 'GET';
  return {
    method,
    mode: options.mode ?? 'cors',
    cache: options.cache ?? 'default',
    credentials: options.credentials ?? 'same-origin',
    headers: __buildRequestHeaders(options.headers),
    priority: options.priority ?? 'auto',
    redirect: options.redirect ?? 'follow',
    referrer: options.referrer ?? 'about:client',
    referrerPolicy: options.referrerPolicy ?? 'no-referrer-when-downgrade',
    signal: options.signal,
    integrity: options.integrity || '',
    keepalive: options.keepalive ?? false,
    body: method === 'GET' ? null : __buildRequestBody(options.body),
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
 * - MISSING_CONTENT_TYPE_HEADER: if the Content-Type header is not present
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
const extractResponseData = async <T extends IResponseDataType>(
  res: Response,
  dType: T,
): Promise<IResponseData<T>> => {
  switch (dType) {
    case 'arrayBuffer': {
      return res.arrayBuffer() as IResponseData<T>;
    }
    case 'blob': {
      return res.blob() as IResponseData<T>;
    }
    case 'formData': {
      return res.formData() as IResponseData<T>;
    }
    case 'json': {
      return res.json() as IResponseData<T>;
    }
    case 'text': {
      return res.text() as IResponseData<T>;
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
});

/**
 * Creates an asynchronous delay that resolves once the provided seconds have passed.
 * @param seconds
 * @returns Promise<void>
 */
const delay = (seconds: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, seconds * 1000);
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
  delay,
};
