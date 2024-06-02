import { encodeError } from 'error-message-utils';
import { ERRORS } from '../shared/errors.js';
import {
  IRequestInput,
  IResponseDataType,
  IResponseData,
} from '../shared/types.js';

/* ************************************************************************************************
 *                                         REQUEST HELPERS                                        *
 ************************************************************************************************ */



const buildRequest = (input: IRequestInput): Request => new Request(input);





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
      return await res.arrayBuffer() as IResponseData<T>;
    }
    case 'blob': {
      return await res.blob() as IResponseData<T>;
    }
    case 'formData': {
      return await res.formData() as IResponseData<T>;
    }
    case 'json': {
      return await res.json() as IResponseData<T>;
    }
    case 'text': {
      return await res.text() as IResponseData<T>;
    }
    default:
      throw new Error(encodeError(`The provided response data type '${dType}' is invalid.`, ERRORS.INVALID_RESPONSE_DTYPE));
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
