import * as t from './testability';

//'export const originalFetch = window.fetch' does not work for some reason
const _nativeFetch = window.fetch;
const _monitoredFetch = (input: RequestInfo, init?: RequestInit) => {
    t.startBackgroundOp();
    return new Promise<Response>((res, rej) => {
        _nativeFetch(input, init)
            .then(r => {
                res(r);
                t.endBackgroundOp();
            })
            .catch(e => {
                rej(e);
                t.endBackgroundOp();
            });
    });
};

export const nativeFetch = _nativeFetch;
export const fetch = _monitoredFetch;
export const monitorFetch = () => {
    window.fetch = _monitoredFetch;
};