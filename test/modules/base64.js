var base64 = require('../../js/modules/base64');
var ua = require('../../js/modules/uintArray');

QUnit.test('Test base64 encode', function (assert) {
    var testString = 'test';
    var testArray = ua.toArray(testString);
    var testResult = 'dGVzdA==';

    assert.equal(base64.encode(testArray), testResult);
});

QUnit.test('Test base64 decode', function (assert) {
    var encoded = 'dGVzdA==';
    var testResult = 'test';
    var decoded = base64.decode(encoded);

    assert.equal(ua.toString(decoded), testResult);
});

QUnit.test('Encode-decode test', function (assert) {
    var testString = 'simple string for custom test';
    var testArray = ua.toArray(testString);
    var encoded = base64.encode(testArray);
    var decoded = ua.toString(base64.decode(encoded));

    assert.equal(decoded, testString);
});
