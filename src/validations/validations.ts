
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
 * Ensures the Request's Content-Type Header is identical to the Response's
 * @param req
 * @param res
 * @throws
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers are not identical
 */
const __validateContentType = (req: Request, res: Response) => {
  const reqContentType = req.headers.get('Content-Type');
  const resContentType = res.headers.get('Content-Type');
  if (reqContentType !== resContentType) {
    throw new Error(encodeError(`The request's content type '${reqContentType}' is different from the one received in the response '${resContentType}'.`, ERRORS.CONTENT_TYPE_MISSMATCH));
  }
};

/**
 * Validates the Response's status code and the Content-Type Header.
 * @param req
 * @param res
 * @param options
 * @throws
 * - UNEXPECTED_RESPONSE_STATUS_CODE: if the code doesn't meet the requirements set in the options
 * - CONTENT_TYPE_MISSMATCH: if the Content-Type Headers are not identical
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
