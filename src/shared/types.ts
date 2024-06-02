

/* ************************************************************************************************
 *                                          GLOBAL TYPES                                          *
 ************************************************************************************************ */

/**
 * Request Input
 * The URL of the request's target.
 */
type IRequestInput = string | URL;

/**
 * Request Options
 * The options that can be applied when sending a Fetch Request.
 */
type IRequestOptions = RequestInit;




/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Request Method
 * The HTTP Methods supported by this library. To make use of a different one, pass the method name
 * directly in the request options.
 */
type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Response Data Type
 * The type of data that will be extracted from the HTTP Response body.
 */
type IResponseDataType = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';

type IResponseData<T> = T extends 'arrayBuffer' ? ArrayBuffer
  : T extends 'blob' ? Blob
    : T extends 'formData' ? FormData
      : T extends 'json' ? any
        : T extends 'text' ? string
          : never;



/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  // global types
  IRequestInput,
  IRequestOptions,

  // types
  IRequestMethod,
  IResponseDataType,
  IResponseData,
};
