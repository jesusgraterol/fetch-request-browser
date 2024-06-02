import { encodeError } from 'error-message-utils';
import { ERRORS } from '../shared/errors.js';
import {
  IRequestInput,
  IRequestOptions,
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


const extractResponseData = <T extends IResponseDataType>(
  response: Response,
  dType: T,
): Promise<IResponseData<T>> => {
  switch (dType) {
    case 'arrayBuffer': {
      return response.arrayBuffer();
    }
    case 'blob': {
      return response.blob();
    }
    case 'formData': {
      return response.formData();
    }
    case 'json': {
      return response.json();
    }
    case 'text': {
      return response.text();
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
