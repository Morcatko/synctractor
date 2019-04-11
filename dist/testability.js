"use strict";
exports.__esModule = true;
var nativeSetTimeout = window.setTimeout;
var Testability = (function () {
    function Testability() {
        var _this = this;
        this.counter = 0;
        this.callbacks = [];
        this.isStable = function () { return _this.counter === 0; };
        this.increaseCounter = function () {
            _this.counter++;
        };
        this.decreaseCounter = function () {
            _this.counter--;
            if (_this.counter < 0) {
                throw new Error('Counter less then 0');
            }
            if ((_this.isStable()) && (_this.callbacks.length)) {
                nativeSetTimeout(function () {
                    if (_this.isStable()) {
                        while (_this.callbacks.length !== 0) {
                            var cb = _this.callbacks.pop();
                            cb();
                        }
                    }
                }, 0);
            }
        };
    }
    Testability.prototype.whenStable = function (callback) {
        if (this.isStable()) {
            callback();
        }
        else {
            this.callbacks.push(callback);
        }
    };
    return Testability;
}());
var testability = window._synctractor =
    window._synctractor || new Testability();
exports.init = function () {
    window.getAngularTestability = function (_element) { return testability; };
    window.getAllAngularTestabilities = function () { return [testability]; };
};
exports.startBackgroundOp = testability.increaseCounter;
exports.endBackgroundOp = testability.decreaseCounter;
