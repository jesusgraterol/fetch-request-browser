/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
type IErrorCode =
  | 'INVALID_REQUEST_URL'
  | 'INVALID_REQUEST_HEADERS'
  | 'INVALID_REQUEST_OPTIONS'
  | 'INVALID_RESPONSE_DTYPE'
  | 'UNEXPECTED_RESPONSE_STATUS_CODE'
  | 'INVALID_RESPONSE_CONTENT_TYPE'
  | 'CONTENT_TYPE_MISSMATCH';
const ERRORS: { [key in IErrorCode]: IErrorCode } = {
  INVALID_REQUEST_URL: 'INVALID_REQUEST_URL',
  INVALID_REQUEST_HEADERS: 'INVALID_REQUEST_HEADERS',
  INVALID_REQUEST_OPTIONS: 'INVALID_REQUEST_OPTIONS',
  INVALID_RESPONSE_DTYPE: 'INVALID_RESPONSE_DTYPE',
  UNEXPECTED_RESPONSE_STATUS_CODE: 'UNEXPECTED_RESPONSE_STATUS_CODE',
  INVALID_RESPONSE_CONTENT_TYPE: 'INVALID_RESPONSE_CONTENT_TYPE',
  CONTENT_TYPE_MISSMATCH: 'CONTENT_TYPE_MISSMATCH',
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { ERRORS };
