
import { encodeError } from 'error-message-utils';
import { IOptions } from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Builds the error message for a Response Instance that has an unexpected HTTP code.
 * @param res
 * @returns string
 */
const __buildUnexpectedCodeErrorMessage = (res: Response): string => encodeError(`Request Failed: received unexpected response code '${res.status}': ${res.statusText}`, ERRORS.UNEXPECTED_RESPONSE_STATUS_CODE);

/**
 * Validates the Response's status code. Note that if the acceptableStatusCodes array is provided
 * it will not validate the acceptableStatusCodesRange.
 * @param res
 * @param options
 * @throws
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 */
const __validateStatusCode = (res: Response, options: IOptions): void => {
  if (Array.isArray(options.acceptableStatusCodes) && options.acceptableStatusCodes.length) {
    if (!options.acceptableStatusCodes.includes(res.status)) {
      throw new Error(__buildUnexpectedCodeErrorMessage(res));
    }
  } else if (
    res.status < options.acceptableStatusCodesRange.min
    || res.status > options.acceptableStatusCodesRange.max
  ) {
    throw new Error(__buildUnexpectedCodeErrorMessage(res));
  }
};

/**
 * Ensures the Request's Accept Header matches the Response's Content-Type
 * @param req
 * @param res
 * @throws
 * - INVALID_RESPONSE_CONTENT_TYPE: if the res lacks the Content-Type Header or is an empty string
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers don't match
 */
const __validateContentType = (req: Request, res: Response) => {
  const reqAccept: string = <string>req.headers.get('Accept'); // reqs sent with this lib always have the Accept header
  const resContentType = res.headers.get('Content-Type');
  if (typeof resContentType !== 'string' || !resContentType.length) {
    throw new Error(encodeError(`The response's Content-Type Header is invalid. Received: '${resContentType}'.`, ERRORS.INVALID_RESPONSE_CONTENT_TYPE));
  }
  if (!resContentType.includes(reqAccept)) {
    throw new Error(encodeError(`The request's Accept Header '${reqAccept}' is different to the Content-Type received in the response '${resContentType}'.`, ERRORS.CONTENT_TYPE_MISSMATCH));
  }
};

/**
 * Validates the Response's status code and the Content-Type Header.
 * @param req
 * @param res
 * @param options
 * @throws
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - INVALID_RESPONSE_CONTENT_TYPE: if the res lacks the Content-Type Header or is an empty string
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers don't match
 */
const validateResponse = (req: Request, res: Response, options: IOptions): void => {
  // validate the status code
  __validateStatusCode(res, options);

  // validate the content type
  __validateContentType(req, res);
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // implementation
  validateResponse,
};
