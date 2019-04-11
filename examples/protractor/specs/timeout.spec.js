const $ = require('protractor').$;

describe('Synctractor', () => {
    it('Should wait for timeout', async () => {
        const button = $('#btn');
        const counter = $('#cnt');
        
        expect(await counter.getText()).toEqual('0');
        await button.click();
        expect(await counter.getText()).toEqual('1');
    });
});