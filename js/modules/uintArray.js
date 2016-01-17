'use strict';
/**
 * Provides conversion with UintArray
 */

module.exports = {
    /**
     * Convert Uint16Array to string.
     * @param array Uint16Array.
     * @returns {string}
     */
    toString: function (array) {
        return String.fromCharCode.apply(null, array);
    },

    /**
     * Convert string to Uint16Array.
     * @param string
     * @returns {Uint16Array}
     */
    toArray: function (string) {
        if (typeof  string != 'string') {
            return string;
        }

        var uint = new Uint16Array(string.length);
        for (var i = 0, j = string.length; i < j; ++i) {
            uint[i] = string.charCodeAt(i);
        }
        return uint;
    },
    /**
     * Convert Uint8Array to string.
     * @param array Uint16Array.
     * @returns {string}
     */
    a8toString: function (array) {
        var data = new Uint16Array(array.length / 2);
        for (var i = 0, j = 0; j < array.length; i++, j+=2) {
            data[i] = array[j + 1] | array[j] << 8;
        }
        return String.fromCharCode.apply(null, data);
    },

    /**
     * Convert string to Uint8Array.
     * @param string
     * @returns {Uint8Array}
     */
    to8Array: function (string) {
        if (typeof  string != 'string') {
            return string;
        }

        var uint = new Uint8Array(string.length * 2);
        var value;
        var length = uint.length;
        for (var i = 0, j = 0; i < length; i+=2, j++) {
            value = string.charCodeAt(j);
            uint[i] = (value >> 8) & 0xff;
            uint[i + 1] = value & 0xff;
        }
        return uint;
    }
};
