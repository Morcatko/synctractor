# Synctractor
Angular-Protractor synchronization for non-angular apps (React, Vue, ...)
Using this library you can get rid of almost all `browser.sleeps` and `browser.waits` in your protractor tests and relly on the same synchronization mechanism that is used by protract and angular.

## Quick Setup
1. Install synctractor `npm i --save synctractor`
1. Remove `ignoreSynchronization` from protractor config as it is not needed anymore
1. Add this as the very first lines of your app entry point:
    ```
    import * as synctractor from 'synctractor';
    synctractor.init();
    synctractor.monitorFetch();
    synctractor.monitorTimeout((_, t) => t !== 11000); 
    ```
    (see `setTimeout` details bellow for explanation of this magic number)


## Manual Mode
There is automatic mode (`synctractor.monitorXXX()`) where you setup synctractor on your app entry point and that is all and there is also a manual mode, where you only initialize synctractor but you have to update calls all over your code. In automatic mode. you can get to unmonitored calls by `synctractor.nativeXXX()`

1. Initialize synctractor
    ```
    import * as synctractor from 'synctractor';
    synctractor.init();
    ```
1. Replace calls in your code:
    - `fetch` => `synctractor.fetch`
    - `setTimeout` => `synctractor.setTimeout`
    - `clearTimeout` => `synctractor.clearTimeout`

### fetch
- Manual - `synctractor.fetch(...)`
- Automatic - `synctractor.monitorFetch()`


### setTimeout
- Manual - `synctractor.setTimeout()` and `synctractor.clearTimeout()`
- Automatic - `synctractor.monitorTimeout()`
    - There is one glitch with `monitorTimeout()`. Protractor itself uses `setTimeout`. This call will be captured by synctractor and protractor (as it is waiting for its own wait :) ) will eventually fail. To workaround this you can add a fitler function to a `monitorTimeout`. Calls to `setTimeout` where this function returns `false` will not be monitored. By default protractor sets timeout to `11000`. You can use this value to fitler out calls made by protractor.
        ```
        synctractor.monitorTimeout((_, t) => t !== 11000);
        ```
        This value can be changed in protractor config by setting `allScriptsTimeout` value.

### trackBackgroundOp
 - In some cases you might want to group multiple backend calls into single protractor wait. In that case you can use `trackBackgroundOp` function.
    ```
    await trackBackgroundOp(async () => {
        await call1();
        doSomeMagic();
        await call2();
    });
    ```

### Unsupported
- AJAX
- setInterval

## Examples
See `examples` folder. There is very simple example with a `setTimeout` written in couple frameworks and one protractor test.
1. Clone this repository
1. Build synctractor (`npm run build` in a root folder)
1. Pick a framework and enter (...and keep it running):
```
npm i
npm start
```
1. In a `protractor` folder run:
```
npm i
npm run test
```
Protractor tests should click on a button and wait for counter to increment.

## Notes
Synctractor (fetch monitoring only) is succesfully used on a medium sized react+mobx app for last few months. SetTimeout was written only because of the examples and was not tested in a production yet.