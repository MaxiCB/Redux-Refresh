# Redux-Refresh

## Installation

```sh
npm install redux-refresh --save
yarn add redux-refresh
```

## Usage

Redux-Refresh is a library meant to solve the problem of losing state on a page refresh.

### Example

```typescript
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { preserveState, retrieveState } from "redux-refresh";

const testing = {
  test: "Hello!",
  two: "World",
};

window.addEventListener("unload", () => {
  console.log("Unloading");
  preserveState(testing);
});
window.addEventListener("load", () => {
  console.log("Loading");
  console.log("Retrieved: ", retrieveState());
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

```sh
Output should be 'Retrieved: {test: "Hello!", two: "World"}'
```
