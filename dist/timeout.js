"use strict";
exports.__esModule = true;
var t = require("./testability");
var _nativeSetTimeout = window.setTimeout;
var _nativeClearTimeout = window.clearTimeout;
var filterFunc = null;
var trackedTimeoutIds = {};
function removeTimeoutId(handle) {
    if (!handle)
        return;
    if (trackedTimeoutIds[handle]) {
        delete trackedTimeoutIds[handle];
        t.endBackgroundOp();
    }
}
function _monitoredSetTimeout(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var internalArgs = args.map(function (a) { return a; });
    internalArgs.splice(0, 0, handler, timeout);
    if (filterFunc && !filterFunc.apply(null, internalArgs)) {
        return _nativeSetTimeout.apply(null, internalArgs);
    }
    var timeoutId = 0;
    internalArgs[0] = function () {
        var timeoutArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            timeoutArgs[_i] = arguments[_i];
        }
        handler.apply(null, timeoutArgs);
        removeTimeoutId(timeoutId);
    };
    t.startBackgroundOp();
    timeoutId = _nativeSetTimeout.apply(null, internalArgs);
    trackedTimeoutIds[timeoutId] = 1;
    return timeoutId;
}
function _monitoredClearTimeout(handle) {
    _nativeClearTimeout(handle);
    removeTimeoutId(handle);
}
exports.nativeSetTimeout = _nativeSetTimeout;
exports.nativeClearTimeout = _nativeClearTimeout;
exports.setTimeout = _monitoredSetTimeout;
exports.clearTimeout = _monitoredClearTimeout;
exports.monitorTimeout = function (filter) {
    filterFunc = filter;
    window.setTimeout = _monitoredSetTimeout;
    window.clearTimeout = _monitoredClearTimeout;
};
