import {
  IRequestInput,
  IRequestMethod,
  IRequestOptions,
  IResponseDataType,
  IOptions,
  IRequestResponse,
} from './shared/types.js';
import { buildOptions, buildRequest, extractResponseData } from './utils/utils.js';
import { validateResponse } from './validations/validations.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Builds and Sends an HTTP Request based on the provided input and options.
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

  // return the request's response
  return {
    headers: res.headers,
    data: await extractResponseData(res, opts.responseDataType),
  };
};


const sendGET = (input: IRequestInput, options?: Partial<IOptions>) => {
  // const req = new Request(input, );
};

/**
 * Builds and Sends a POST HTTP Request based on the provided input and options.
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
