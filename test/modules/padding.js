var padding = require('../../js/modules/padding');

QUnit.test('Padding', function (assert) {
    var data = new Uint8Array([1, 2, 3, 4]);
    var pdata = new Uint8Array([1, 2, 3, 4, 0, 0]);
    assert.deepEqual(padding.pad(data, 3), pdata);
});

QUnit.test('Unpadding', function (assert) {
    var data = new Uint8Array([1, 2, 3, 4]);
    var pdata = new Uint8Array([1, 2, 3, 4, 0, 0]);
    assert.deepEqual(padding.unpad(pdata), data);
});
