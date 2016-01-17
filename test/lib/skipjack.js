var Skipjack = require('../../js/lib/skipjack');
var ua = require('../../js/modules/uintArray');
var b64 = require('../../js/modules/base64');

QUnit.test('Test skipjack encrypt', function (assert) {
    var testString = 'test';
    var cipher = new Skipjack('1234567890');
    var encrypted = cipher.encryptBlock(ua.toArray(testString));

    assert.equal(b64.encode(encrypted), '1B7/y65fE10=');
});

QUnit.test('Test skipjack decrypt', function (assert) {
    var testString = 'test';
    var cipher = new Skipjack('1234567890');
    var encrypted = b64.decode('1B7/y65fE10=');
    var decrypted = cipher.decryptBlock(encrypted);

    assert.equal(ua.toString(decrypted), testString);
});

QUnit.test('Test skipjack encrypt-decrypt', function (assert) {
    var testString = ua.toArray('test');
    var cipher = new Skipjack('1234567890');
    var encrypted = cipher.encryptBlock(testString);
    var decrypted = cipher.decryptBlock(encrypted);

    assert.deepEqual(decrypted, testString);
});
