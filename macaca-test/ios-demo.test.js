/**
 * Created by qa-wang on 16/9/6.
 */
var path = require('path');
const wd =require('macaca-wd');
const driver = wd.promiseChainRemote({
    host: 'localhost',
    port: 3456
});

describe('macaca-ios-demo', function () {
    this.timeout(5 * 60 * 1000);

    before(function () {
        return driver.init({
            platformVerison: '9.3.5',
            platformName: 'iOS',
            bundleId: 'com.nd.app.factory.jianggongyouth',
            udid: 'c4ac25813b981d253b518fb88b511ad024be2709'
        });
    });

    after(function () {
        return driver
            .sleep(1000)
            .quit();
    });

    it('#1 test login', function () {
        return driver
            .waitForElementByXPath('//XCUIElementTypeTextField[1]')
            .clear()
            .sendKeys('890707')
            .elementByXPath('//XCUIElementTypeSecureTextField[1]')
            .sendKeys('123456')
            .elementByName('登录')
            .click();
    });

    it('#2 send text weibo', function () {
        return driver
            .waitForElementByName('general top icon publish norma')
            .click()
            .waitForElementByClassName('XCUIElementTypeTextView')
            .sendKeys('macaca测试。')
            .elementByName('general top icon confirm norma')
            .click();
    });

    it('#3 send image weibo', function () {
        return driver
            .waitForElementByName('general top icon publish norma')
            .click()
            .elementByName('general input bottom picture n')
            .click()
            .waitForElementsByClassName('XCUIElementTypeImage')
            .then(function (els) {
                return els[1];
            })
            .click()
            .elementByName('确定(1)')
            .click()
            .elementByName('general top icon confirm norma')
            .click();
    });

    it('#4 signin case', function () {
        return driver
            .waitForElementByName('我')
            .elementByXPath('//XCUIElementTypeImage[0]')
            .click()
            .sleep(2000);
    });

    it('#5 birthday case', function () {
        return driver
            .waitForElementByName('我')
            .click()
            .elementByName('生日祝福')
            .click()
            .waitForElementsByName('祝福')
            .then(function (els) {
                return els[0];
            })
            .click();
    });
});