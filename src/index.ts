import {
  IRequestInput,
  IRequestMethod,
  IRequestOptions,
  IResponseDataType,
  IOptions,
  IRequestResponse,
} from './shared/types.js';
import {
  buildOptions,
  buildRequest,
  extractResponseData,
  delay,
} from './utils/utils.js';
import { validateResponse } from './validations/validations.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Builds and sends a HTTP Request based on the provided input and options.
 * @param input
 * @param options?
 * @returns Promise<IRequestResponse>
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - MISSING_CONTENT_TYPE_HEADER: if the Content-Type header is not present
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers are not identical
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const send = async (
  input: IRequestInput,
  options?: Partial<IOptions>,
): Promise<IRequestResponse> => {
  // build the options
  const opts = buildOptions(options);

  // build the request
  const req = buildRequest(input, opts.requestOptions);

  // send the request
  const res = await fetch(req);

  // validate the response
  validateResponse(req, res, opts);

  // print a warning in case the request was redirected
  if (res.redirected) {
    console.warn(`The request sent to '${req.url}' was redirected. Please update the implementation to avoid future redirections.`);
  }

  // return the request's response
  return {
    headers: res.headers,
    data: await extractResponseData(res, opts.responseDataType),
  };
};


/**
 * Builds and sends a GET HTTP Request based on the provided input and options.
 * IMPORTANT: The browser environment can be highly unreliable as the user can physically move
 * around and suffer from an intermittent Internet connection. Therefore, some GET requests are
 * worth retrying as they could fail temporarily and prevent a view from loading.
 * @param input
 * @param options?
 * @param retryAttempts? - the number of times it will retry the request on failure
 * @param retryDelaySeconds? - the # of secs it will wait before re-sending the req. Defaults to 3
 * @returns Promise<IRequestResponse>
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - MISSING_CONTENT_TYPE_HEADER: if the Content-Type header is not present
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers are not identical
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const __sendGET = (
  input: IRequestInput,
  options?: Partial<IOptions>,
): Promise<IRequestResponse> => send(input, {
  ...options,
  requestOptions: {
    ...options?.requestOptions,
    method: 'GET',
  },
});
const sendGET = async (
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryAttempts?: number,
  retryDelaySeconds?: number,
): Promise<IRequestResponse> => {
  try {
    return await __sendGET(input, options);
  } catch (e) {
    // if the request should be retried, activate the delay and do so. Otherwise, rethrow the error
    if (typeof retryAttempts === 'number' && retryAttempts > 0) {
      await delay(retryDelaySeconds || 3);
      return sendGET(input, options, retryAttempts - 1, retryDelaySeconds);
    }
    throw e;
  }
};


/**
 * Builds and sends a POST HTTP Request based on the provided input and options.
 * @param input
 * @param options?
 * @returns Promise<IRequestResponse>
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - MISSING_CONTENT_TYPE_HEADER: if the Content-Type header is not present
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers are not identical
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const sendPOST = (
  input: IRequestInput,
  options?: Partial<IOptions>,
): Promise<IRequestResponse> => send(input, {
  ...options,
  requestOptions: {
    ...options?.requestOptions,
    method: 'POST',
  },
});





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // types
  IRequestInput,
  IRequestMethod,
  IRequestOptions,
  IResponseDataType,
  IOptions,
  IRequestResponse,

  // implementation
  send,
  sendGET,
  sendPOST,
};
