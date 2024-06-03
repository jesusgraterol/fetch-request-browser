import { encodeError } from 'error-message-utils';
import { ERRORS } from '../shared/errors.js';
import {
  IRequestInput,
  IResponseDataType,
  IResponseData,
  IRequestOptions,
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
 */
const __buildRequestHeaders = (headers: any): Headers => {
  if (headers) {
    if (headers instanceof Headers) {
      return headers;
    }
    if (typeof headers === 'object') {
      try {
        return new Headers(headers);
      } catch (e) {
        throw new Error(encodeError(e, ERRORS.INVALID_REQUEST_HEADERS));
      }
    }
  }
  return new Headers({ 'Content-Type': 'application/json' });
};

/**
 * Builds the body of the request in string format.
 * @param body
 * @returns string | undefined
 */
const __buildRequestBody = (body: any): string | undefined => {
  if (body) {
    if (typeof body === 'object') {
      return JSON.stringify(body);
    }
    return body;
  }
  return undefined;
};

/**
 * Builds the options for a request from a partial object.
 * @param options
 * @returns IRequestOptions
 * @throws
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 */
const __buildRequestOptions = (options: Partial<IRequestOptions> = {}): IRequestOptions => ({
  method: options.method ?? 'GET',
  mode: options.mode ?? 'cors',
  cache: options.cache ?? 'default',
  credentials: options.credentials ?? 'same-origin',
  headers: __buildRequestHeaders(options.headers),
  priority: options.priority ?? 'auto',
  redirect: options.redirect ?? 'follow',
  referrer: options.referrer ?? 'about:client',
  referrerPolicy: options.referrerPolicy ?? 'no-referrer-when-downgrade',
  signal: options.signal,
  integrity: options.integrity,
  keepalive: options.keepalive ?? false,
  body: __buildRequestBody(options.body),
});

/**
 * Builds the Request Instance based on given input and options.
 * @param input
 * @param options
 * @returns Request
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 */
const buildRequest = (input: IRequestInput, options: Partial<IRequestOptions>): Request => {
  try {
    return new Request(__buildRequestInput(input), __buildRequestOptions(options));
  } catch (e) {
    // if it is a known error, just rethrow it. Otherwise, it is a request options error
    if (true) {
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
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // request helpers
  buildRequest,

  // response helpers
  extractResponseData,
};
