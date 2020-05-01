# Redux-Refresh

## Installation

```sh
npm install redux-refresh --save
yarn add redux-refresh
```

## Usage

### Javascript

```javascript
var reduxRefresh = require("redux-refresh");
var helloRefresh = reduxRefresh.testLib("Hello World!");
console.log(helloRefresh);
```

```sh
Output should be 'This is from Redux-Refresh: Hello World!'
```

### TypeScript

```typescript
import { testLib } from "redux-refresh";
const helloRefresh = testLib("Hello World!");
console.log(helloRefresh);
```

```sh
Output should be 'This is from Redux-Refresh: Hello World!'
```

## Test

```sh
npm run test
```
