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
    $('#result-panel').removeClass('hidden');
    var toEncrypt = parseInt($('input[name="encrypt"]:checked').val());
    var data = $('#data').val();
    var pass = $('#password').val();

    var cipher = new Skipjack(pass);
    var result = toEncrypt ? encrypt(cipher, data) : decrypt(cipher, data);
    $('#result').html(result);
}

$(document).ready(function () {
    $('#process-form').submit(process);
});