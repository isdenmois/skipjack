var OFBMode = require('../../js/modes/ofb');
var Skipjack = require('../../js/lib/skipjack');
var ua = require('../../js/modules/uintArray');
var b64 = require('../../js/modules/base64');

QUnit.test('OFB mode encrypt-decrypt', function (assert) {
    var testString = ua.to8Array('test some string!');
    var key = new Uint16Array([0, 153, 136, 119, 102, 85, 68, 51, 34, 17]);
    var cipher = new Skipjack(key);
    var ofb = new OFBMode(cipher, [0, 1, 2, 3, 4, 5, 6, 7]);

    var encrypted = ofb.encrypt(testString);
    var decrypted = ofb.decrypt(encrypted);

    assert.deepEqual(decrypted, testString);
    assert.throws(function(){new OFBMode(cipher, [0, 1])}, 'IV must be at least 8 bytes long');
});
