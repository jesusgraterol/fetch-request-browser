import { extractMessage } from 'error-message-utils';
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
 * Builds and sends an HTTP Request based on the provided input and options. This function is only
 * meant to be invoked by `send(...)`
 * @param input
 * @param options?
 * @returns Promise<IRequestResponse>
 */
const __executeSend = async (
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
    code: res.status,
    headers: res.headers,
    data: await extractResponseData(res, opts.responseDataType),
  };
};

/**
 * Attempts to send a HTTP request persistently (optionally).
 * @param input
 * @param options?
 * @param retryDelaySchedule? - list of seconds that will be applied to the delay before retrying
 * @returns Promise<IRequestResponse>
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - INVALID_RESPONSE_CONTENT_TYPE: if the res lacks the Content-Type Header or is an empty string
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers don't match
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const send = async (
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse> => {
  try {
    return await __executeSend(input, options);
  } catch (e) {
    // rethrow the err if there are no attempts left or the HTTP status code is 429 (too many reqs)
    if (
      extractMessage(e).includes('429')
      || !Array.isArray(retryDelaySchedule)
      || retryDelaySchedule.length === 0
    ) {
      throw e;
    }
    await delay(retryDelaySchedule[0]);
    return send(input, options, retryDelaySchedule.slice(1));
  }
};

/**
 * Builds and sends a GET HTTP Request based on the provided input and options.
 * IMPORTANT: The browser environment can be highly unreliable as the user can physically move
 * around and suffer from an intermittent Internet connection. Therefore, some GET requests are
 * worth retrying as they could fail temporarily and prevent a view from loading.
 * @param input
 * @param options?
 * @param retryDelaySchedule? - list of seconds that will be applied to the delay before retrying
 * @returns Promise<IRequestResponse>
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - INVALID_RESPONSE_CONTENT_TYPE: if the res lacks the Content-Type Header or is an empty string
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers don't match
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const sendGET = async (
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse> => send(input, {
  ...options,
  requestOptions: {
    ...options?.requestOptions,
    method: 'GET',
  },
}, retryDelaySchedule);

/**
 * Builds and sends a POST HTTP Request based on the provided input and options.
 * @param input
 * @param options?
 * @param retryDelaySchedule? - list of seconds that will be applied to the delay before retrying
 * @returns Promise<IRequestResponse>
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - INVALID_RESPONSE_CONTENT_TYPE: if the res lacks the Content-Type Header or is an empty string
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers don't match
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const sendPOST = (
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse> => send(input, {
  ...options,
  requestOptions: {
    ...options?.requestOptions,
    method: 'POST',
  },
}, retryDelaySchedule);

/**
 * Builds and sends a PUT HTTP Request based on the provided input and options.
 * @param input
 * @param options?
 * @param retryDelaySchedule? - list of seconds that will be applied to the delay before retrying
 * @returns Promise<IRequestResponse>
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - INVALID_RESPONSE_CONTENT_TYPE: if the res lacks the Content-Type Header or is an empty string
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers don't match
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const sendPUT = (
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse> => send(input, {
  ...options,
  requestOptions: {
    ...options?.requestOptions,
    method: 'PUT',
  },
}, retryDelaySchedule);

/**
 * Builds and sends a PATCH HTTP Request based on the provided input and options.
 * @param input
 * @param options?
 * @param retryDelaySchedule? - list of seconds that will be applied to the delay before retrying
 * @returns Promise<IRequestResponse>
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - INVALID_RESPONSE_CONTENT_TYPE: if the res lacks the Content-Type Header or is an empty string
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers don't match
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const sendPATCH = (
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse> => send(input, {
  ...options,
  requestOptions: {
    ...options?.requestOptions,
    method: 'PATCH',
  },
}, retryDelaySchedule);

/**
 * Builds and sends a DELETE HTTP Request based on the provided input and options.
 * @param input
 * @param options?
 * @param retryDelaySchedule? - list of seconds that will be applied to the delay before retrying
 * @returns Promise<IRequestResponse>
 * @throws
 * - INVALID_REQUEST_URL: if the provided input URL cannot be parsed
 * - INVALID_REQUEST_HEADERS: if invalid headers are passed in object format
 * - INVALID_REQUEST_OPTIONS: if the Request Instance cannot be instantiated due to the passed opts
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - INVALID_RESPONSE_CONTENT_TYPE: if the res lacks the Content-Type Header or is an empty string
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers don't match
 * - INVALID_RESPONSE_DTYPE: if the data type is not supported by the Response Instance
 */
const sendDELETE = (
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse> => send(input, {
  ...options,
  requestOptions: {
    ...options?.requestOptions,
    method: 'DELETE',
  },
}, retryDelaySchedule);





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
  sendPUT,
  sendPATCH,
  sendDELETE,
};
