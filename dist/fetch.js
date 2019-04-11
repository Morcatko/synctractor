"use strict";
exports.__esModule = true;
var t = require("./testability");
var _nativeFetch = window.fetch;
var _monitoredFetch = function (input, init) {
    t.startBackgroundOp();
    return new Promise(function (res, rej) {
        _nativeFetch(input, init)
            .then(function (r) {
            res(r);
            t.endBackgroundOp();
        })["catch"](function (e) {
            rej(e);
            t.endBackgroundOp();
        });
    });
};
exports.nativeFetch = _nativeFetch;
exports.fetch = _monitoredFetch;
exports.monitorFetch = function () {
    window.fetch = _monitoredFetch;
};
