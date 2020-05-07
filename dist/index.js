"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @Method: Preserving Redux State
 * @Param {object}
 * @Return {string}
 */
function preserveState(state) {
    var json = JSON.stringify(state);
    window.localStorage.setItem("redux-refresh", json);
    return json;
}
exports.preserveState = preserveState;
/**
 * @Method: Retrieving Redux State
 * @Param {state}
 * @Return {object}
 */
function retrieveState() {
    var result = JSON.parse(window.localStorage.getItem("redux-refresh"));
    window.localStorage.removeItem("redux-refresh");
    return result;
}
exports.retrieveState = retrieveState;
