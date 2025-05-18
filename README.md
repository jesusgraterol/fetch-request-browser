# Fetch Request Browser

The `fetch-request-browser` package makes working with external APIs simple and efficient. This intuitive wrapper leverages the power of the Fetch API, providing a clean and concise interface for your API interactions.


If you are working on a node-based environment, make use of [fetch-request-node](https://github.com/jesusgraterol/fetch-request-node) instead.


<br />

## Getting Started

Install the package:
```bash
npm install -S fetch-request-browser
```

### Examples

Send a `GET` request that will retry (up to 3 times) on failure to [HTTPBin](https://httpbin.org/):

```typescript
import { sendGET } from 'fetch-request-browser';

await sendGET<IHTTPBinResponse>(
  'https://httpbin.org/get?someUid=5', 
  { 
    requestOptions: {  
      credentials: 'include',
    },
    acceptableStatusCodes: [200, 201],
  }, 
  [3, 5, 10]
);
// {
//   code: 200,
//   statusText: 'OK',
//   headers: Headers {
//     date: 'Fri, 06 Dec 2024 14:14:12 GMT',
//     'content-type': 'application/json',
//     'content-length': '399',
//     connection: 'keep-alive',
//     server: 'gunicorn/19.9.0',
//     'access-control-allow-origin': '*',
//     'access-control-allow-credentials': 'true'
//   },
//   data: {
//     args: { someUid: '5' },
//     headers: {
//       Accept: 'application/json',
//       'Accept-Encoding': 'br, gzip, deflate',
//       'Accept-Language': '*',
//       Host: 'httpbin.org',
//       'Sec-Fetch-Mode': 'cors',
//       'User-Agent': 'node',
//       'X-Amzn-Trace-Id': 'Root=1-675306b4-175937342b1b6ffa6ddbaaee'
//     },
//     origin: '136.144.19.103',
//     url: 'https://httpbin.org/get?someUid=5'
//   }
// }
```

Send a `POST` request that will retry (up to 3 times) on failure to [HTTPBin](https://httpbin.org/):

```typescript
import { sendGET } from 'fetch-request-browser';

await sendPOST<IHTTPBinResponse>(
  'https://httpbin.org/post?id=1',
  {
    requestOptions: {
      body: {
        someKey: 'Hello',
        someNumber: 123456,
      },
      credentials: 'include',
    },
    acceptableStatusCodes: [200, 201],
  },
  [3, 5, 10]
);
// {
//   code: 200,
//   statusText: 'OK',
//   headers: Headers {
//     date: 'Fri, 06 Dec 2024 12:57:25 GMT',
//     'content-type': 'application/json',
//     'content-length': '619',
//     connection: 'keep-alive',
//     server: 'gunicorn/19.9.0',
//     'access-control-allow-origin': '*',
//     'access-control-allow-credentials': 'true'
//   },
//   data: {
//     args: { id: '1' },
//     data: '{"someKey":"Hello","someNumber":123456}',
//     files: {},
//     form: {},
//     headers: {
//       Accept: 'application/json',
//       'Accept-Encoding': 'br, gzip, deflate',
//       'Accept-Language': '*',
//       'Content-Length': '39',
//       'Content-Type': 'application/json',
//       Host: 'httpbin.org',
//       'Sec-Fetch-Mode': 'cors',
//       'User-Agent': 'node',
//       'X-Amzn-Trace-Id': 'Root=1-6752f4b5-76a61b597284afb62df479eb'
//     },
//     json: { someKey: 'Hello', someNumber: 123456 },
//     origin: '136.144.19.233',
//     url: 'https://httpbin.org/post?id=1'
//   }
// }
```





<br/>

## API Reference

<details>
  <summary><code>send</code></summary>

  Builds and sends an HTTP Request based on the provided input and options.
  ```typescript
  await send<IHTTPBinResponse>(
    'https://httpbin.org/get?foo=hey&bar=123', {
      requestOptions: { method: 'GET' }
    }
  );
  // {
  //   code: 200,
  //   statusText: 'OK',
  //   headers: Headers {
  //     date: 'Fri, 06 Dec 2024 13:05:20 GMT',
  //     'content-type': 'application/json',
  //     'content-length': '422',
  //     connection: 'keep-alive',
  //     server: 'gunicorn/19.9.0',
  //     'access-control-allow-origin': '*',
  //     'access-control-allow-credentials': 'true'
  //   },
  //   data: {
  //     args: { bar: '123', foo: 'hey' },
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-Encoding': 'br, gzip, deflate',
  //       'Accept-Language': '*',
  //       Host: 'httpbin.org',
  //       'Sec-Fetch-Mode': 'cors',
  //       'User-Agent': 'node',
  //       'X-Amzn-Trace-Id': 'Root=1-6752f690-43ddfac50ee723b532cf3cf3'
  //     },
  //     origin: '136.144.19.106',
  //     url: 'https://httpbin.org/get?foo=hey&bar=123'
  //   }
  // }
  ```
</details>

<details>
  <summary><code>sendGET</code></summary>

  Builds and sends a `GET` HTTP Request based on the provided input and options.
  ```typescript
  await sendGET<IHTTPBinResponse>('https://httpbin.org/get?foo=hey&bar=123');
  // {
  //   code: 200,
  //   statusText: 'OK',
  //   headers: Headers {
  //     date: 'Fri, 06 Dec 2024 13:05:20 GMT',
  //     'content-type': 'application/json',
  //     'content-length': '422',
  //     connection: 'keep-alive',
  //     server: 'gunicorn/19.9.0',
  //     'access-control-allow-origin': '*',
  //     'access-control-allow-credentials': 'true'
  //   },
  //   data: {
  //     args: { bar: '123', foo: 'hey' },
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-Encoding': 'br, gzip, deflate',
  //       'Accept-Language': '*',
  //       Host: 'httpbin.org',
  //       'Sec-Fetch-Mode': 'cors',
  //       'User-Agent': 'node',
  //       'X-Amzn-Trace-Id': 'Root=1-6752f690-43ddfac50ee723b532cf3cf3'
  //     },
  //     origin: '136.144.19.106',
  //     url: 'https://httpbin.org/get?foo=hey&bar=123'
  //   }
  // }
  ```
</details>

<details>
  <summary><code>sendPOST</code></summary>

  Builds and sends a `POST` HTTP Request based on the provided input and options.
  ```typescript
  await sendPOST<IHTTPBinResponse>(
    'https://httpbin.org/post',
    {
      requestOptions: {
        body: {
          someKey: 'Hello',
          someNumber: 123456,
        },
      },
    },
  );
  // {
  //   code: 200,
  //   statusText: 'OK',
  //   headers: Headers {
  //     date: 'Fri, 06 Dec 2024 13:13:18 GMT',
  //     'content-type': 'application/json',
  //     'content-length': '596',
  //     connection: 'keep-alive',
  //     server: 'gunicorn/19.9.0',
  //     'access-control-allow-origin': '*',
  //     'access-control-allow-credentials': 'true'
  //   },
  //   data: {
  //     args: {},
  //     data: '{"someKey":"Hello","someNumber":123456}',
  //     files: {},
  //     form: {},
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-Encoding': 'br, gzip, deflate',
  //       'Accept-Language': '*',
  //       'Content-Length': '39',
  //       'Content-Type': 'application/json',
  //       Host: 'httpbin.org',
  //       'Sec-Fetch-Mode': 'cors',
  //       'User-Agent': 'node',
  //       'X-Amzn-Trace-Id': 'Root=1-6752f86e-366f8cb71596c46374885670'
  //     },
  //     json: { someKey: 'Hello', someNumber: 123456 },
  //     origin: '136.144.19.99',
  //     url: 'https://httpbin.org/post'
  //   }
  // }
  ```
</details>

<details>
  <summary><code>sendPUT</code></summary>

  Builds and sends a `PUT` HTTP Request based on the provided input and options.
  ```typescript
  await sendPUT<IHTTPBinResponse>(
    'https://httpbin.org/put',
    {
      requestOptions: {
        body: {
          someKey: 'Hello',
          someNumber: 123456,
        },
      },
    },
  );
  // {
  //   code: 200,
  //   statusText: 'OK',
  //   headers: Headers {
  //     date: 'Fri, 06 Dec 2024 13:19:07 GMT',
  //     'content-type': 'application/json',
  //     'content-length': '596',
  //     connection: 'keep-alive',
  //     server: 'gunicorn/19.9.0',
  //     'access-control-allow-origin': '*',
  //     'access-control-allow-credentials': 'true'
  //   },
  //   data: {
  //     args: {},
  //     data: '{"someKey":"Hello","someNumber":123456}',
  //     files: {},
  //     form: {},
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-Encoding': 'br, gzip, deflate',
  //       'Accept-Language': '*',
  //       'Content-Length': '39',
  //       'Content-Type': 'application/json',
  //       Host: 'httpbin.org',
  //       'Sec-Fetch-Mode': 'cors',
  //       'User-Agent': 'node',
  //       'X-Amzn-Trace-Id': 'Root=1-6752f9cb-4633cbc111fccdc020c15081'
  //     },
  //     json: { someKey: 'Hello', someNumber: 123456 },
  //     origin: '136.144.19.122',
  //     url: 'https://httpbin.org/put'
  //   }
  // }
  ```
</details>

<details>
  <summary><code>sendPATCH</code></summary>

  Builds and sends a `PATCH` HTTP Request based on the provided input and options.
  ```typescript
  await sendPATCH<IHTTPBinResponse>(
    'https://httpbin.org/patch',
    {
      requestOptions: {
        body: {
          someKey: 'Hello',
          someNumber: 123456,
        },
      },
    },
  );
  // {
  //   code: 200,
  //   statusText: 'OK',
  //   headers: Headers {
  //     date: 'Fri, 06 Dec 2024 13:22:54 GMT',
  //     'content-type': 'application/json',
  //     'content-length': '597',
  //     connection: 'keep-alive',
  //     server: 'gunicorn/19.9.0',
  //     'access-control-allow-origin': '*',
  //     'access-control-allow-credentials': 'true'
  //   },
  //   data: {
  //     args: {},
  //     data: '{"someKey":"Hello","someNumber":123456}',
  //     files: {},
  //     form: {},
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-Encoding': 'br, gzip, deflate',
  //       'Accept-Language': '*',
  //       'Content-Length': '39',
  //       'Content-Type': 'application/json',
  //       Host: 'httpbin.org',
  //       'Sec-Fetch-Mode': 'cors',
  //       'User-Agent': 'node',
  //       'X-Amzn-Trace-Id': 'Root=1-6752faae-7da3d0d33f55d85f1f563abb'
  //     },
  //     json: { someKey: 'Hello', someNumber: 123456 },
  //     origin: '136.144.19.93',
  //     url: 'https://httpbin.org/patch'
  //   }
  // }
  ```
</details>

<details>
  <summary><code>sendDELETE</code></summary>

  Builds and sends a `DELETE` HTTP Request based on the provided input and options.
  ```typescript
  await sendDELETE<IHTTPBinResponse>('https://httpbin.org/delete?id=1');
  // {
  //   code: 200,
  //   statusText: 'OK',
  //   headers: Headers {
  //     date: 'Fri, 06 Dec 2024 13:25:41 GMT',
  //     'content-type': 'application/json',
  //     'content-length': '496',
  //     connection: 'keep-alive',
  //     server: 'gunicorn/19.9.0',
  //     'access-control-allow-origin': '*',
  //     'access-control-allow-credentials': 'true'
  //   },
  //   data: {
  //     args: { id: '1' },
  //     data: '',
  //     files: {},
  //     form: {},
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-Encoding': 'br, gzip, deflate',
  //       'Accept-Language': '*',
  //       'Content-Type': 'application/json',
  //       Host: 'httpbin.org',
  //       'Sec-Fetch-Mode': 'cors',
  //       'User-Agent': 'node',
  //       'X-Amzn-Trace-Id': 'Root=1-6752fb55-62da6f1d3348e8a55af75ae3'
  //     },
  //     json: null,
  //     origin: '136.144.19.240',
  //     url: 'https://httpbin.org/delete?id=1'
  //   }
  // }
  ```
</details>






<br />

## Types

<details>
  <summary><code>IRequestInput</code></summary>

  The URL of the request's target.
  ```typescript
  type IRequestInput = string | URL;
  ```
</details>

<details>
  <summary><code>IRequestMethod</code></summary>

  The HTTP Methods supported by this library. To make use of a different one, pass the method name directly in the request options.
  ```typescript
  type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  ```
</details>

<details>
  <summary><code>RequestInit</code></summary>

  The [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) dictionary of the Fetch API represents the set of options that can be used to configure a fetch request.
  ```typescript
  interface RequestInit {
    /** A BodyInit object or null to set request's body. */
    body?: BodyInit | null;
    /** A string indicating how the request will interact with the browser's cache to set request's cache. */
    cache?: RequestCache;
    /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
    credentials?: RequestCredentials;
    /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
    headers?: HeadersInit;
    /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
    integrity?: string;
    /** A boolean to set request's keepalive. */
    keepalive?: boolean;
    /** A string to set request's method. */
    method?: string;
    /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
    mode?: RequestMode;
    priority?: RequestPriority;
    /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
    redirect?: RequestRedirect;
    /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
    referrer?: string;
    /** A referrer policy to set request's referrerPolicy. */
    referrerPolicy?: ReferrerPolicy;
    /** An AbortSignal to set request's signal. */
    signal?: AbortSignal | null;
    /** Can only be null. Used to disassociate request from any Window. */
    window?: null;
  }
  ```
</details>

<details>
  <summary><code>IRequestOptions</code></summary>

  The options that can be applied when sending a Fetch Request.
  IMPORTANT: the reason RequestInit is extended is because in the original type, the body property does not accept plain objects. Even though this makes sense,  utilities so the Request's body is always going to have a valid type.
  ```typescript
  interface IRequestOptions extends Omit<RequestInit, 'body'> {
    method: IRequestMethod; // this lib only makes use of these methods
    body: BodyInit | Record<string, unknown> | Array<unknown> | null;
  }
  
  interface IProcessedRequestOptions extends RequestInit {
    method: IRequestMethod;
  }
  ```
</details>

<details>
  <summary><code>IResponseDataType</code></summary>

  The type of data that will be extracted from the HTTP Response body.
  ```typescript
  type IResponseDataType = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';
  ```
</details>

<details>
  <summary><code>IOptions</code></summary>

  The options object that can be passed and used for any request.
  ```typescript
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
  ```
</details>

<details>
  <summary><code>IRequestResponse<T></code></summary>

  The object containing the result of the Request.
  ```typescript
  interface IRequestResponse<T> {
    // the HTTP status code extracted from the Response
    code: number;

    // the message associated with the status code
    statusText: string;

    // the Response's Headers. Useful as some service providers attach important info in the headers
    headers: Headers;

    // the data extracted from the Response Instance
    data: T;
  }
  ```
</details>





<br />

## Built With

- TypeScript




<br />

## Running the Tests

```bash
# unit tests
npm run test:unit

# integration tests
npm run test:integration
```





<br />

## License

[MIT](https://choosealicense.com/licenses/mit/)





<br />

## Deployment

Install dependencies:
```bash
npm install
```


Build the library:
```bash
npm start
```


Publish to `npm`:
```bash
npm publish
```