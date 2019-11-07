declare type FilterFunc = (handler: Function, timeout?: number, ...args: any[]) => boolean;
declare function _monitoredSetTimeout(handler: Function, timeout?: number, ...args: any[]): number;
declare function _monitoredClearTimeout(handle: number): void;
export declare const nativeSetTimeout: ((handler: TimerHandler, timeout?: number, ...arguments: any[]) => number) & ((handler: TimerHandler, timeout?: number, ...arguments: any[]) => number);
export declare const nativeClearTimeout: ((handle?: number) => void) & ((handle?: number) => void);
export declare const setTimeout: typeof _monitoredSetTimeout;
export declare const clearTimeout: typeof _monitoredClearTimeout;
export declare const monitorTimeout: (filter?: FilterFunc) => void;
export {};
