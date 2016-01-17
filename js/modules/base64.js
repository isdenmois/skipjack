'use strict';

module.exports = {
    decode: function (s) {
        s = s.replace(/[^A-Za-z0-9\+\/]/g, '');
        var n = s.length,
            k = n * 3 + 1 >> 2, r = new Uint16Array(k);

        for (var m3, m4, u24 = 0, j = 0, i = 0; i < n; i++) {
            m4 = i & 3;
            var c = s.charCodeAt(i);

            c = c > 64 && c < 91 ?
            c - 65 : c > 96 && c < 123 ?
            c - 71 : c > 47 && c < 58 ?
            c + 4 : c === 43 ?
                62 : c === 47 ?
                63 : 0;

            u24 |= c << 18 - 6 * m4;
            if (m4 === 3 || n - i === 1) {
                for (m3 = 0; m3 < 3 && j < k; m3++, j++) {
                    r[j] = u24 >>> (16 >>> m3 & 24) & 255;
                }
                u24 = 0;

            }
        }
        return r;
    },
    /**
     * Base64.encode(data) convert CryptoOperationData data to BASE64 string.
     */
    encode: function (data) {
        var m3 = 2, s = '';
        for (var n = data.length, u24 = 0, i = 0; i < n; i++) {
            m3 = i % 3;
            u24 |= data[i] << (16 >>> m3 & 24);
            if (m3 === 2 || n - i === 1) {
                for (var j = 18; j >= 0; j -= 6) {
                    var c = u24 >>> j & 63;
                    c = c < 26 ? c + 65 : c < 52 ? c + 71 : c < 62 ? c - 4 :
                        c === 62 ? 43 : c === 63 ? 47 : 65;
                    s += String.fromCharCode(c);
                }
                u24 = 0;
            }
        }
        return s.substr(0, s.length - 2 + m3) + (m3 === 2 ? '' : m3 === 1 ? '=' : '==');
    }
};
