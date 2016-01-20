var b64 = require('./modules/base64');
var ua = require('./modules/uintArray');
var Skipjack = require('./lib/skipjack');
var ECBMode = require('./modes/ecb');
var OFBMode = require('./modes/ofb');

/**
 * Encrypt the message.
 */
function encrypt(event) {
    event.preventDefault();
    var toEncrypt = $('#encrypt').val();
    var pkey = $('#pkey').val();
    var iv = ua.toArray($('#iv').val());
    var mode = $('input[name="mode"]:checked').attr('id');

    var cipher = new Skipjack(pkey);
    switch (mode) {
        case 'ofb':
            mode = new OFBMode(cipher, iv);
            break;

        default:
            mode = new ECBMode(cipher);
    }

    toEncrypt = ua.to8Array(toEncrypt);
    toEncrypt = mode.encrypt(toEncrypt);
    var result = b64.encode(toEncrypt);
    $('#decrypt').val(result).find('+ label').addClass('active');
}

/**
 * Decrypt the message.
 */
function decrypt(event) {
    event.preventDefault();
    var toDecrypt = $('#decrypt').val();
    var pkey = $('#pkey').val();
    var iv = ua.toArray($('#iv').val());
    var mode = $('input[name="mode"]:checked').attr('id');

    var cipher = new Skipjack(pkey);
    switch (mode) {
        case 'ofb':
            mode = new OFBMode(cipher, iv);
            break;

        default:
            mode = new ECBMode(cipher);
    }

    toDecrypt = b64.decode(toDecrypt);
    toDecrypt = mode.decrypt(toDecrypt);
    var result = ua.a8toString(toDecrypt);
    $('#encrypt').val(result).find('+ label').addClass('active');
}

/**
 * Add listeners.
 */
window.onload = function () {
    var encryptBtn = document.getElementById('encryptBtn');
    if (encryptBtn) {
        encryptBtn.onclick = encrypt;
    }
    var decryptBtn = document.getElementById('decryptBtn');
    if (decryptBtn && decryptBtn.addEventListener) {
        decryptBtn.onclick = decrypt;
    }
};
