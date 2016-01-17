var b64 = require('./modules/base64');
var ua = require('./modules/uintArray');
var Skipjack = require('./lib/skipjack');
var ECBMode = require('./modes/ecb');

function encrypt(cipher, data) {
    data = cipher.encrypt(ua.to8Array(data));
    return b64.encode(data);
}

function decrypt(cipher, data) {
    data = cipher.decrypt(b64.decode(data));
    return ua.a8toString(data);
}

function process(event) {
    event.preventDefault();
    document.getElementById('result-panel').removeAttribute('class');
    var toEncrypt = parseInt(document.querySelector('input[name="encrypt"]:checked').value);
    var data = document.getElementById('data').value;
    var pass = document.getElementById('password').value;

    var cipher = new Skipjack(pass);
    var ecb = new ECBMode(cipher);
    var result = toEncrypt ? encrypt(ecb, data) : decrypt(ecb, data);
    document.getElementById('result').innerHTML = result;
}

window.onload = function () {
    document.getElementById('process-form').addEventListener('submit', process);
};
