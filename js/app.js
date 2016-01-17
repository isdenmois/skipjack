var b64 = require('./modules/base64');
var ua = require('./modules/uintArray');
var Skipjack = require('./lib/skipjack');
var ECBMode = require('./modes/ecb');
var OFBMode = require('./modes/ofb');

function encrypt(cipher, data) {
    data = cipher.encrypt(ua.to8Array(data));
    return b64.encode(data);
}

function decrypt(cipher, data) {
    data = cipher.decrypt(b64.decode(data));
    return ua.a8toString(data);
}

function getValue(id) {
    return document.getElementById(id).value;
}

function getRValue(name) {
    return document.querySelector('input[name="' + name + '"]:checked').value;
}

function setValue(id, value) {
    document.getElementById(id).innerHTML = value;
}

function process(event) {
    event.preventDefault();
    document.getElementById('result-panel').removeAttribute('class');

    var toEncrypt = parseInt(getRValue('encrypt'));
    var data = getValue('data');
    var pass = getValue('password');
    var iv = ua.toArray(getValue('iv'));
    var mode = getRValue('mode');

    var cipher = new Skipjack(pass);
    switch (mode) {
        case 'ofb':
            mode = new OFBMode(cipher, iv);
            break;

        default:
            mode = new ECBMode(cipher);
    }

    var result = toEncrypt ? encrypt(mode, data) : decrypt(mode, data);
    setValue('result', result);
}

window.onload = function () {
    var form = document.getElementById('process-form');
    if (form && form.addEventListener) {
        form.addEventListener('submit', process);
    }
};
