# Fetch Request Browser

The `fetch-request-browser` package makes working with external APIs simple and efficient. This intuitive wrapper leverages the power of the Fetch API, providing a clean and concise interface for your API interactions.


If you are working on a node-based environment, make use of [fetch-request-node](https://github.com/jesusgraterol/fetch-request-node) instead.


<br />

## Getting Started

Install the package:
```bash
$ npm install -S fetch-request-browser
```





<br />

## Usage

```typescript
import { sendGET } from 'fetch-request-browser';

await send(
  'https://httpbin.org/get', 
  { 
    requestOptions: {  
      method: 'GET' 
    } 
  }, 
  [3, 5, 10]
);
// {
//   code: 200,
//   headers: Headers {
//     date: 'Tue, 04 Jun 2024 18:52:29 GMT',
//     'content-type': 'application/json',
//     'content-length': '407',
//     connection: 'keep-alive',
//     server: 'gunicorn/19.9.0',
//     'access-control-allow-origin': '*',
//     'access-control-allow-credentials': 'true'
//   },
//   data: {
//     args: {},
//     headers: {
//       Accept: 'application/json',
//       'Accept-Encoding': 'br, gzip, deflate',
//       'Accept-Language': '*',
//       'Content-Type': 'application/json',
//       Host: 'httpbin.org',
//       'Sec-Fetch-Mode': 'cors',
//       'User-Agent': 'node',
//       'X-Amzn-Trace-Id': '...'
//     },
//     origin: '...',
//     url: 'https://httpbin.org/get'
//   }
// }
```





<br/>

## API

Build and send an HTTP Request (any method):

```typescript
send(
  input: IRequestInput, 
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse>
```

<br />

Build and send a `GET` HTTP Request:
```typescript
sendGET(
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse>
```

<br />

Build and send a `POST` HTTP Request:
```typescript
sendPOST(
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse>
```

<br />

Build and send a `PUT` HTTP Request:
```typescript
sendPUT(
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse>
```

<br />

Build and send a `PATCH` HTTP Request:
```typescript
sendPATCH(
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse>
```

<br />

Build and send a `DELETE` HTTP Request:
```typescript
sendDELETE(
  input: IRequestInput,
  options?: Partial<IOptions>,
  retryDelaySchedule?: number[],
): Promise<IRequestResponse>
```



<br />

## Built With

- TypeScript




<br />

## Running the Tests

```bash
# Unit Tests
$ npm run test:unit

# Integration Tests
$ npm run test:integration
```





<br />

## License

[MIT](https://choosealicense.com/licenses/mit/)





<br />

## Acknowledgments

- [MDN](https://developer.mozilla.org/en-US/)
- [web.dev](https://web.dev/)





<br />

## @TODOS

- [ ] Improve the docs





<br />

## Deployment

Install dependencies:
```bash
$ npm install
```


Build the library:
```bash
$ npm start
```


Publish to `npm`:
```bash
$ npm publish
```