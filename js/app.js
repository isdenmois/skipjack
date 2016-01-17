var b64 = require('./modules/base64');
var ua = require('./modules/uintArray');
var Skipjack = require('./lib/skipjack');

function encrypt(cipher, data) {
    return b64.encode(cipher.encryptBlock(ua.toArray(data)));
}

function decrypt(cipher, data) {
    return ua.toString(cipher.decryptBlock(b64.decode(data)));
}

function process(event) {
    event.preventDefault();
    document.getElementById('result-panel').removeAttribute('class');
    var toEncrypt = parseInt(document.querySelector('input[name="encrypt"]:checked').value);
    var data = document.getElementById('data').value;
    var pass = document.getElementById('password').value;

    var cipher = new Skipjack(pass);
    var result = toEncrypt ? encrypt(cipher, data) : decrypt(cipher, data);
    document.getElementById('result').innerHTML = result;
}

$(document).ready(function () {
    document.getElementById('process-form').addEventListener('submit', process);
});