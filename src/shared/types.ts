

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
 * utilities so the Request's body is always going to have a valid type.
 */
interface IRequestOptions extends Omit<RequestInit, 'body'> {
  method: IRequestMethod; // this lib only makes use of these methods
  body: BodyInit | Record<string, unknown> | Array<unknown> | null;
}
interface IProcessedRequestOptions extends RequestInit {
  method: IRequestMethod;
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
/* type IResponseData<T> = T extends 'arrayBuffer' ? ArrayBuffer
  : T extends 'blob' ? Blob
    : T extends 'formData' ? FormData
      : T extends 'json' ? any
        : T extends 'text' ? string
          : never; */

/**
 * Options
 * The options object that can be passed and used for any request.
 */
interface IOptions {
  // the options that will be used to build the request
  requestOptions?: Partial<IRequestOptions>;

  // the expected data type that should be extracted from the response
  responseDataType: IResponseDataType;

  /**
   * Response Status Codes
   * The request's response can be validated by providing a list of acceptable codes or a range
   * object. Keep in mind that if the acceptableStatusCodes array is provided, it will only perform
   * that validation and ignore the acceptableStatusCodesRange.
   */

  // the list of status codes that won't throw an error
  acceptableStatusCodes?: number[];

  // the range of codes that are considered to be acceptable. Defaults to: { min: 200, max: 299 }
  acceptableStatusCodesRange: { min: number, max: number };

  // if enabled, it will not validate the status code from the response object
  skipStatusCodeValidation: boolean;
}

/**
 * Request Response
 * The object containing the result of the Request.
 */
interface IRequestResponse<T> {
  // the HTTP status code extracted from the Response
  code: number;

  // the Response's Headers. Useful as some service providers attach important info in the headers
  headers: Headers;

  // the data extracted from the Response Instance
  data: T;
}





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  // global types
  IRequestInput,
  IRequestOptions,
  IProcessedRequestOptions,

  // types
  IRequestMethod,
  IResponseDataType,
  IOptions,
  IRequestResponse,
};
