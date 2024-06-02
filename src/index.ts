import { IRequestInfo, IRequestOptions } from './shared/types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

const sendRequest = async (requestInfo: IRequestInfo) => {
  const res = await fetch(resource, );
};


const sendGET = (input: string | URL) => {
  const req = new Request(input, );
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // types
  IRequestInfo,
  IRequestOptions,

  // implementation
  sendRequest,
  sendGET,
};
