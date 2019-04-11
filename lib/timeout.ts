import * as t from './testability';

// Based on this - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Polyfill

const _nativeSetTimeout = window.setTimeout;
const _nativeClearTimeout = window.clearTimeout;

type FilterFunc = (handler: Function, timeout?: number, ...args: any[]) => boolean
let filterFunc : FilterFunc = null;

const trackedTimeoutIds: { [key: number]: number } = {};

function removeTimeoutId(handle: number) {
    if (!handle)
        return;

    if (trackedTimeoutIds[handle]) {
        delete trackedTimeoutIds[handle];
        t.endBackgroundOp();
    }
}

function _monitoredSetTimeout(handler: Function, timeout?: number, ...args: any[]) : number {
    const internalArgs = args.map(a => a);
    internalArgs.splice(0, 0, handler, timeout);

    if (filterFunc && !filterFunc.apply(null, internalArgs)) {
        return _nativeSetTimeout.apply(null, internalArgs);
    }
    
    let timeoutId = 0;
    internalArgs[0] = (...timeoutArgs: any[]) => {
        handler.apply(null, timeoutArgs);
        removeTimeoutId(timeoutId);
    };

    t.startBackgroundOp();
    timeoutId = _nativeSetTimeout.apply(null, internalArgs);
    trackedTimeoutIds[timeoutId] = 1;
    return timeoutId;
}

function _monitoredClearTimeout(handle: number) {
    _nativeClearTimeout(handle);
    removeTimeoutId(handle);
}

export const nativeSetTimeout = _nativeSetTimeout;
export const nativeClearTimeout = _nativeClearTimeout;
export const setTimeout = _monitoredSetTimeout;
export const clearTimeout = _monitoredClearTimeout;

export const monitorTimeout = (filter ?: FilterFunc) => {
    filterFunc = filter;
    window.setTimeout = _monitoredSetTimeout;
    window.clearTimeout = _monitoredClearTimeout;
}