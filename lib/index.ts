/**
 * @Method: Preserving Redux State
 * @Param {object}
 * @Return {string}
 */
export function preserveState(state: object): string {
  const json = JSON.stringify(state);
  window.localStorage.setItem("redux-refresh", json);
  return json;
}

/**
 * @Method: Retrieving Redux State
 * @Param {state}
 * @Return {object}
 */
export function retrieveState(): object {
  const result = JSON.parse(window.localStorage.getItem("redux-refresh")!);
  window.localStorage.removeItem("redux-refresh");
  return result;
}
