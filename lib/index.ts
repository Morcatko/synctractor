import { startBackgroundOp, endBackgroundOp } from './testability';

export * from './testability';
export * from './fetch';
export * from './timeout';

export async function trackBackgroundOp<T>(action: () => Promise<T>): Promise<T> {
    startBackgroundOp();
    try {
        return await action()
    }
    finally {
        endBackgroundOp();
    }
}