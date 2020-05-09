"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var index_1 = require("../dist/lib/index");
var react_redux_1 = require("react-redux");
var Refresher = function (_a) {
    var secret = _a.secret, children = _a.children, store = _a.store;
    var refresh = index_1.initRefresh(secret);
    var init = store();
    var res = react_1.default.createElement(react_redux_1.Provider, { store: init }, children);
    var test;
    window.addEventListener("unload", function () {
        init = store();
        test = init.getState();
        var state = init.getState();
        console.log("Unload State: ", state);
        var enc = refresh.encrypt(state);
        console.log("Encrypt: ", enc);
        window.localStorage.setItem("redux-refresh", enc);
    });
    window.addEventListener("load", function () {
        var enc = window.localStorage.getItem("redux-refresh");
        console.log("Test: ", test);
        console.log("Enc: ", enc);
        var dec = refresh.decrypt(enc);
        console.log("Decrypt: ", dec);
        var decrypt = store(dec);
        console.log("Decrypt State: ", decrypt.getState());
        res = react_1.default.createElement(react_redux_1.Provider, { store: decrypt }, children);
        // window.localStorage.removeItem("redux-refresh");
    });
    return res;
};
exports.default = Refresher;
