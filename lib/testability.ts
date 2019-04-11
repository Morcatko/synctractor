//Based on this https://github.com/angular/angular/blob/master/packages/core/src/testability/testability.ts

interface ProtractorTestability {
    isStable(): boolean;
    whenStable(callback: Function): void;
}

const nativeSetTimeout = window.setTimeout;

class Testability implements ProtractorTestability {
    private counter: number = 0;
    private callbacks: Function[] = [];

    isStable = () => this.counter === 0;
    whenStable(callback: Function): void {
        if (this.isStable()) {
            callback();
        } else {
            this.callbacks.push(callback);
        }
    }

    increaseCounter = () => {
        this.counter++;
    }
    decreaseCounter = () => {
        this.counter--;
        if (this.counter < 0) {
            throw new Error('Counter less then 0');
        }
        if ((this.isStable()) && (this.callbacks.length)) {
            nativeSetTimeout(() => {
                if (this.isStable()) {
                    while (this.callbacks.length !== 0) {
                        const cb = this.callbacks.pop();
                        cb();
                    }
                }
            }, 0);
        }
    }
}

const testability =
    (window as any)._synctractor =
        (window as any)._synctractor || new Testability();

export const init = () => {
    (window as any).getAngularTestability = (_element: any) => testability;
    (window as any).getAllAngularTestabilities = () => [testability];
};

export const startBackgroundOp = testability.increaseCounter;
export const endBackgroundOp = testability.decreaseCounter;