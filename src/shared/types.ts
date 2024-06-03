

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
 * IMPORTANT: the reason RequestInit is extended is because in the original type, the body property
 * does not accept plain objects. Even though this makes sense, the body is processed in the
 * utilities so the Request's body is always instantiated with a string.
 */
interface IRequestOptions extends RequestInit {
  method: IRequestMethod,
  body: any
}




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

/**
 * Response Data
 * The format of the data that can be extracted from the Response object.
 */
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
