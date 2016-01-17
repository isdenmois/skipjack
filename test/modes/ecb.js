var ECBMode = require('../../js/modes/ecb');
var Skipjack = require('../../js/lib/skipjack');
var ua = require('../../js/modules/uintArray');
var b64 = require('../../js/modules/base64');

QUnit.test('ECB mode encrypt-decrypt', function (assert) {
    var testString = ua.to8Array('test of long string');
    var cipher = new Skipjack('1234567890');
    var ecb = new ECBMode(cipher);

    var encrypted = ecb.encrypt(testString);
    var decrypted = ecb.decrypt(encrypted);

    assert.deepEqual(decrypted, testString);
});

QUnit.test('Test ECB mode encrypt', function (assert) {
    var testString = 'test';
    var cipher = new Skipjack('1234567890');
    var ecb = new ECBMode(cipher);
    var encrypted = ecb.encrypt(ua.to8Array(testString));

    assert.equal(b64.encode(encrypted), '1B7/y65fE10=');
});

QUnit.test('Test ECB mode decrypt', function (assert) {
    var testString = 'test';
    var cipher = new Skipjack('1234567890');
    var ecb = new ECBMode(cipher);
    var encrypted = b64.decode('1B7/y65fE10=');
    var decrypted = ecb.decrypt(encrypted);

    assert.equal(ua.a8toString(decrypted), testString);
});